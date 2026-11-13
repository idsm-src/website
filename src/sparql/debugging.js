import React from "react";
import { createRoot } from "react-dom/client";

import { DebugRun } from "./debugRun";
import DebugPanel from "./DebugPanel";


// the arguments of a request that the debugger forwards, those that the CORS proxy adds, and those of GraphDB, which
// tabs persisted by an older version of the editor may still have
const forwardedArgs = ["query", "named-graph-uri", "default-graph-uri"];
const proxyArgs = ["endpoint", "method"];
const graphdbArgs = ["infer", "sameAs"];


// the debugging of the tabs with a debug run, see leave()
const debuggings = new Set();

window.addEventListener("pagehide", () => {
  for(const debugging of debuggings)
    debugging.leave();
});


// a list of the values of an argument of a request
function listOf(value) {
  return value == null ? [] : (Array.isArray(value) ? value : [value]).map(String);
}


/*
 * What the debugger is to send to the endpoint: the request a normal run of the query of a tab sends, which the editor
 * gives with the start of every run. The tab sends the request through the CORS proxy when the endpoint does not allow
 * the page to send it directly, but the debugger sends it itself, so the endpoint and the method are those of the tab
 * then. The debugger forwards only the first named and default graph, no other arguments, and as the Accept header the
 * one given for SELECT queries, whatever the form of the query; it keeps the request where it is not protected, so a
 * request with credentials is not handed to it.
 */
function requestOf(tab, yasqe, populated) {
  const endpoint = tab.getEndpoint();
  const proxied = !!(tab.yasgui.config.corsProxy && !window.Yasgui.corsEnabled[endpoint]);
  const value = entry => typeof entry === "function" ? entry(yasqe) : entry;
  const method = proxied ? value(tab.getRequestConfig().method) : populated.reqMethod;
  const args = populated.args ?? {};
  const notes = [];
  let refusal = null;

  // superagent sends the Accept header given by the editor, which a header spelled the same replaces and a header
  // spelled otherwise extends, and the other headers
  const accept = [];
  const headers = {};

  for(const [name, entry] of Object.entries(populated.headers ?? {})) {
    if(name === "Accept")
      accept.unshift(String(entry));
    else if(name.toLowerCase() === "accept")
      accept.push(String(entry));
    else
      headers[name] = String(entry);
  }

  if(!Object.keys(populated.headers ?? {}).includes("Accept"))
    accept.unshift(populated.accept);

  try {
    const url = new URL(endpoint);

    if(url.username || url.password)
      refusal = "The query is not debugged, as the address of the endpoint holds credentials, which the debugger "
        + "would keep. The query can be run without debugging.";
  } catch(error) {
    // the debugger tells that the endpoint is not valid
  }

  if(Object.keys(headers).length)
    refusal = `The query is not debugged, as the tab sends the HTTP header ${Object.keys(headers).join(", ")}, which `
      + "may hold credentials the debugger would keep. Remove the header in the settings of the tab, or run the query "
      + "without debugging.";

  const namedGraphs = listOf(args["named-graph-uri"]);
  const defaultGraphs = listOf(args["default-graph-uri"]);

  if(namedGraphs.length > 1)
    notes.push(`The debugger sends only the first of the ${namedGraphs.length} named graphs of the tab.`);

  if(defaultGraphs.length > 1)
    notes.push(`The debugger sends only the first of the ${defaultGraphs.length} default graphs of the tab.`);

  const ignored = Object.keys(args).filter(name => !forwardedArgs.includes(name) && !graphdbArgs.includes(name)
    && !(proxied && proxyArgs.includes(name)));

  if(ignored.length)
    notes.push(`The debugger does not send the argument${ignored.length > 1 ? "s" : ""} ${ignored.join(", ")} of `
      + "the tab.");

  // the debugger rejects any other property, and a missing one
  const context = {
    endpoint: endpoint,
    method: String(method).toUpperCase() === "GET" ? "GET" : "POST",
    acceptHeaderGraph: accept.join(", "),
    acceptHeaderSelect: accept.join(", "),
    acceptHeaderUpdate: accept.join(", "),
    namedGraphs: namedGraphs,
    defaultGraphs: defaultGraphs,
    args: [],
    headers: {},
    withCredentials: false,
    adjustQueryBeforeRequest: false,
  };

  return {
    endpoint: endpoint,
    query: typeof args.query === "string" ? args.query : yasqe.getValue(),
    queryType: yasqe.getQueryType(),
    context: context,
    notes: notes,
    refusal: refusal,
  };
}


/*
 * The debugging of the queries of a tab: a button below the run button that runs the query through the SPARQL debugger
 * (also Ctrl+Shift+Enter or Cmd+Shift+Enter), and a panel between the editor and the results that shows the calls of
 * the last debug run as they go on. The panel stays hidden until the first debug run of the tab, and a normal run or
 * its close button hides it again.
 *
 * A debug run is a normal run of the editor whose request is not sent: the debugger runs the query, and the response
 * of the endpoint it gives is handed to the request as if it came from the endpoint, so the editor and the results
 * show the run as any other, and the run button and closing the tab abort it as any other.
 */
class Debugging {

  constructor(tab, yasqe) {
    this.tab = tab;
    this.yasqe = yasqe;

    // whether the next run of the editor is a debug run, and the last debug run
    this.debugNext = false;
    this.run = null;

    // the panel, made at the first debug run
    this.host = null;
    this.root = null;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "custom-button idsm-debug-button ri-bug-line";

    // the second click of a double click would cancel the run that the first one started
    button.addEventListener("click", event => {
      if(event.detail <= 1)
        this.click();
    });

    this.button = button;

    yasqe.queryBtn?.parentElement?.after(button);
    this.updateButton();

    yasqe.addKeyMap({
      "Shift-Ctrl-Enter": () => this.start(),
      "Shift-Cmd-Enter": () => this.start(),
    });

    yasqe.on("query", (yasqe, request, populated) => this.query(request, populated));
  }


  // the button runs the query unless a query of the tab runs, and cancels a debug run
  click() {
    if(this.yasqe.req?.idsmDebug)
      this.yasqe.abortQuery();
    else if(!this.yasqe.req)
      this.start();
  }


  /*
   * Run the query of the editor as a debug run. The editor tells about a run at once, unless it does not run the query
   * at all, as when there is no endpoint; an update is told about later, and runs as a normal run.
   */
  start() {
    if(this.yasqe.getQueryMode() === "update")
      return;

    this.debugNext = true;

    try {
      this.yasqe.query().catch(() => {});
    } finally {
      this.debugNext = false;
    }
  }


  /*
   * A run of the editor starts: a normal run hides the panel, a debug run hands the query to the debugger in place of
   * sending the request.
   */
  query(request, populated) {
    const debug = this.debugNext;
    this.debugNext = false;
    this.dispose();

    if(!debug) {
      this.hide();
      return;
    }

    const settings = requestOf(this.tab, this.yasqe, populated ?? {});
    const run = new DebugRun(settings, snapshot => this.render(snapshot));
    const yasqe = this.yasqe;
    let ended = false;

    this.run = run;
    debuggings.add(this);

    if(settings.refusal)
      run.fail(settings.refusal);

    request.idsmDebug = true;
    request.on("abort", () => run.cancel());

    // superagent sends the request in _end, and builds the response from its XHR once that ends, which is what the
    // response of the endpoint given by the debugger stands in for; a request ends only once
    request._end = function() {
      if(ended)
        return;

      ended = true;
      run.start();

      run.result.then(result => {
        if(this._aborted)
          return;

        if(result.status === 0) {
          this.callback(new Error(`The debugger cannot reach the endpoint ${run.endpoint}. It calls the endpoints from `
            + "a server of its own, so it cannot debug a query of an endpoint that only your computer can reach."));
          return;
        }

        const headers = { "content-type": result.contentType ?? "text/plain" };

        this.xhr = {
          status: result.status,
          statusText: "",
          responseText: result.text,
          responseType: "",
          getAllResponseHeaders: () => Object.entries(headers).map(([name, value]) => `${name}: ${value}`).join("\r\n"),
          getResponseHeader: name => headers[name.toLowerCase()] ?? null,
          abort: () => {},
        };

        this.emit("end");
      }, error => {
        if(this._aborted)
          return;

        // a cancelled run ends with its request aborted as by the run button, so that no result is stored for it
        if(run.state === "cancelled")
          yasqe.req === this ? yasqe.abortQuery() : this.abort();
        else
          this.callback(error);
      });
    };

    this.show();
    this.render(run.snapshot);
    this.updateButton();
  }


  updateButton() {
    const debugging = !!this.yasqe.req?.idsmDebug;
    const update = this.yasqe.getQueryMode?.() === "update";
    const label = debugging ? "Cancel the debug run" : update ? "Updates cannot be debugged" : "Debug query";

    this.button.classList.toggle("busy", debugging);
    this.button.disabled = !debugging && (update || !!this.yasqe.req);
    this.button.title = label;
    this.button.setAttribute("aria-label", label);
  }


  show() {
    if(!this.host) {
      // not a div, which the styles of the component would size as a part of the tab
      this.host = document.createElement("section");
      this.host.className = "idsm-debug-host";
      this.yasqe.rootEl.parentElement.after(this.host);
      this.root = createRoot(this.host);
    }

    this.host.hidden = false;
  }


  hide() {
    if(!this.host)
      return;

    this.host.hidden = true;
    this.root.render(null);
  }


  render(snapshot) {
    if(this.run === snapshot.run)
      this.root?.render(<DebugPanel key={snapshot.number} snapshot={snapshot} onClose={() => this.close()}/>);
  }


  // the close button of the panel ends the debugging of the tab, also a debug run going on
  close() {
    if(this.yasqe.req?.idsmDebug)
      this.yasqe.abortQuery();

    // the focus would fall to the page, so it goes to the debug button, or to the editor while the button is disabled
    if(this.host?.contains(document.activeElement))
      (this.button.disabled ? this.yasqe : this.button).focus();

    this.dispose();
    this.hide();
  }


  /*
   * The page is left: a debug run going on is aborted as by the run button, so that no result is stored for it, and the
   * debugger deletes the run, as it would keep it for a day otherwise. The page may come back from the back/forward
   * cache, so the panel stays, without the requests and responses of the calls.
   */
  leave() {
    if(this.yasqe.req?.idsmDebug)
      this.yasqe.abortQuery();

    this.run?.release();
  }


  // the last debug run is not needed any more, so the debugger deletes it
  dispose() {
    if(!this.run)
      return;

    this.run.dispose();
    this.run = null;
    debuggings.delete(this);
  }


  destroy() {
    this.dispose();

    // the editor is destroyed while Yasgui updates the page, possibly while React renders
    const root = this.root;
    setTimeout(() => root?.unmount());
    this.host?.remove();
    this.button.remove();
  }
}


/*
 * Give the tabs of Yasgui their debugging, see Debugging. The editors take copies of the methods of Yasqe when they
 * are made, so the methods are changed before the first editor is made.
 */
function installDebugging(Yasgui) {
  const Tab = Yasgui.Tab;
  const Yasqe = Yasgui.Yasqe;

  const initYasqe = Tab.prototype.initYasqe;
  Tab.prototype.initYasqe = function(...args) {
    const result = initYasqe.apply(this, args);
    const yasqe = this.getYasqe();

    if(yasqe && !yasqe.idsmDebugging)
      yasqe.idsmDebugging = new Debugging(this, yasqe);

    return result;
  };

  const updateQueryButton = Yasqe.prototype.updateQueryButton;
  Yasqe.prototype.updateQueryButton = function(...args) {
    const result = updateQueryButton.apply(this, args);
    this.idsmDebugging?.updateButton();
    return result;
  };

  const destroy = Yasqe.prototype.destroy;
  Yasqe.prototype.destroy = function(...args) {
    this.idsmDebugging?.destroy();
    this.idsmDebugging = null;
    return destroy.apply(this, args);
  };
}


export { installDebugging };
