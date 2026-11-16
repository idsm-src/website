import React from "react";
import { createRoot } from "react-dom/client";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import { DebugRun, RUNNING, responseOf } from "./debugRun";
import DebugPanel from "./DebugPanel";
import { downloadResults, saveFile } from "./download";


// the arguments of a request that the debugger forwards, those that the CORS proxy adds, and those of GraphDB, which
// tabs persisted by an older version of the editor may still have
const forwardedArgs = ["query", "named-graph-uri", "default-graph-uri"];
const proxyArgs = ["endpoint", "method"];
const graphdbArgs = ["infer", "sameAs"];

// the plugin of Yasr that shows the request of a call (see addRawRequestPlugin), the name of its view, and how much of
// the request it shows
const rawRequest = "raw_request";
const rawRequestLabel = { en: { [`yasr.plugin_control.plugin.name.${rawRequest}`]: "Raw request" } };
const requestLimit = 1024 * 1024;

// how much of the response of a call its view shows; a longer one is shown only in part, as text, and can be saved
const responseLimit = 10 * 1024 * 1024;

// the extensions of the files a response is saved in, by its media type
const extensions = [
  [/sparql-results\+json|application\/json/, "json"],
  [/sparql-results\+xml|xml/, "xml"],
  [/csv/, "csv"],
  [/tab-separated-values/, "tsv"],
  [/turtle/, "ttl"],
  [/n-triples/, "nt"],
  [/n-quads/, "nq"],
  [/trig/, "trig"],
  [/ld\+json/, "jsonld"],
  [/html/, "html"],
];


// the debugging of the tabs with a debug run, see leave()
const debuggings = new Set();

window.addEventListener("pagehide", () => {
  for(const debugging of debuggings)
    debugging.leave();
});


// Save the whole response of a call as it came, which its view may show only in part
async function saveResponse(run, call) {
  const response = await fetch(run.contentUrl(call.nodeId, "response"), { credentials: "omit" }).catch(() => {
    throw new Error("The debugger cannot be reached.");
  });

  if(!response.ok)
    throw new Error(`The debugger does not give the response (HTTP ${response.status}).`);

  const type = response.headers.get("Content-Type") ?? "";
  const extension = extensions.find(([pattern]) => pattern.test(type))?.[1] ?? "txt";
  saveFile(await response.blob(), `debug-${run.queryId}-${call.nodeId}-response.${extension}`);
}


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


// an icon of Font Awesome as an element
function iconOf({ icon: [width, height, , , path] }) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("aria-hidden", "true");

  const shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
  shape.setAttribute("d", path);
  shape.setAttribute("fill", "currentColor");
  svg.appendChild(shape);

  return svg;
}


/*
 * Give Yasr a plugin that shows the request of a call, as the debugger describes it, as the raw response shows the
 * response: in a read-only CodeMirror, drawn once the results are shown, which it measures. The plugin is made from the
 * plugin of the raw response, which the component registers with its other plugins when it builds Yasgui. The request
 * comes from the Yasr that shows it, as a promise given by its function idsmRequest, which only the views of calls have
 * (see callView).
 */
function addRawRequestPlugin(Yasr) {
  if(Yasr.plugins[rawRequest])
    return;

  const Response = Yasr.plugins.extended_response ?? Yasr.plugins.response;
  const CodeMirror = Object.getPrototypeOf(window.Yasgui.Yasqe);

  class RawRequest extends Response {
    label = rawRequest;
    priority = 0;

    canHandleResults() {
      return typeof this.yasr.idsmRequest === "function";
    }

    getIcon() {
      return iconOf(faPaperPlane);
    }

    download() {
      return undefined;
    }

    // the request is shown once it is read, or why it cannot be, as a warning of the results
    draw() {
      const show = () => {
        // plain text, as the default mode is that of the editor
        this.cm = CodeMirror(this.yasr.resultsEl, {
          mode: "text/plain",
          readOnly: true,
          lineNumbers: true,
          lineWrapping: true,
          value: "",
          extraKeys: { Tab: false },
          theme: this.yasr.config.themeName,
        });

        this.yasr.idsmRequest().then(text => this.cm?.setValue(text),
          error => this.yasr.showWarning(`The request cannot be shown: ${error.message}`, "error", true));
      };

      // a later draw replaces the waiting of an earlier one
      clearInterval(this.isVisibleInterval);

      if(this.yasr.resultsEl.offsetParent !== null) {
        show();
        return;
      }

      this.isVisibleInterval = setInterval(() => {
        if(this.yasr.resultsEl.offsetParent !== null) {
          clearInterval(this.isVisibleInterval);
          this.isVisibleInterval = null;
          show();
        }
      }, 10);
    }

    destroy() {
      clearInterval(this.isVisibleInterval);
      super.destroy?.();
    }
  }

  Yasr.plugins[rawRequest] = RawRequest;
}


/*
 * Give the view of a call the response of the call, read by DebugRun.content, and show the view chosen last in a view
 * of a call (plugin), or the one of the results of the tab. A response cut at its limit cannot be parsed, so it is
 * shown as text in the raw response, unless the raw request is chosen. The view draws it at once, unless it is still
 * being made, as Yasr draws itself after it is made.
 */
function setCallResponse(view, call, content, plugin, draw = true) {
  delete view.plugins.extended_response?.canHandleResults;

  const response = content.truncated
    ? { data: content.text, contentType: "text/plain", ...timesOf(call) }
    : responseOf(call, content);

  view.selectPlugin(plugin ?? view.config.defaultPlugin, true);

  if(content.truncated && view.getSelectedPluginName() !== rawRequest)
    view.selectPlugin("extended_response", true);

  view.setResponse(response, response.executionTime, response.queryStartedTime, undefined, undefined, undefined, draw);
}


// the duration of a call and its start, as Yasr shows them with results
function timesOf(call) {
  const { executionTime, queryStartedTime } = responseOf(call, { text: "" });
  return { executionTime, queryStartedTime };
}


/*
 * A view of a call shown in an element as the results of the tab are: by Yasr of the same class and with the same
 * configuration, which renders the cells as the website does, with the view of the raw request after that of the raw
 * response. It shows the view chosen last in a view of a call (plugin), or the one of the results of the tab, but the
 * raw request while the call has no response yet (content). Yasr and the tools of its toolbar ask the editor of their
 * tab about the query, so they get a stand-in of the editor of the tab, which tells that no query runs and gives the
 * form of the query of the call: the calls of SERVICE clauses are SELECT queries, the root call is the query of the
 * tab; it does not let them listen to the editor nor change it. An error status is shown as the error of a query is,
 * and the views stay selectable also then, and for an ASK query. The request is read at once, so that the view keeps
 * it when the debugger deletes the run.
 */
function callView(tab, element, run, call, content, plugin) {
  const results = tab.getYasr();
  const Yasr = window.Yasgui.Yasr;

  addRawRequestPlugin(Yasr);
  results.config.translationService?.addTranslations?.(rawRequestLabel);

  const queryType = call.parentNodeId == null ? run.queryType : "SELECT";
  const editor = Object.create(tab.getYasqe());

  Object.assign(editor, {
    config: { ...editor.config, paginationOn: false },
    on: () => {},
    off: () => {},
    emit: () => {},
    isQueryRunning: () => false,
    isUpdateQuery: () => false,
    isAskQuery: () => queryType === "ASK",
    isExplainPlanQuery: () => false,
    getQueryType: () => queryType,
    getQueryMode: () => "query",
    getPageSize: () => undefined,
    getPageNumber: () => undefined,
    setPageSize: () => {},
    setPageNumber: () => {},
  });

  const order = results.config.pluginOrder.filter(name => name !== rawRequest);
  order.splice(order.indexOf("extended_response") + 1, 0, rawRequest);

  const view = new results.constructor(editor, element, {
    ...results.config,
    persistenceId: null,
    fullscreen: false,
    pluginOrder: order,
    plugins: { ...results.config.plugins, [rawRequest]: { enabled: true } },
  });

  const request = run.content(call.nodeId, "request", requestLimit).then(content => content.truncated
    ? `${content.text}\n… (only the first ${requestLimit / 1024 / 1024} MB of the request are shown)`
    : content.text);

  request.catch(() => {});
  view.idsmRequest = () => request;

  // ExtendedYasr hides the views for an ASK query and an error
  view.updatePluginElementVisibility = () => view.getPluginSelectorsEl()?.classList.remove("hidden");

  // Yasr, made without a response, draws itself after a while, then with the response given here
  if(content) {
    setCallResponse(view, call, content, plugin, false);
  } else {
    // without a response, the raw response would be empty
    if(view.plugins.extended_response)
      view.plugins.extended_response.canHandleResults = () => false;

    view.selectPlugin(rawRequest, true);
    view.setResponse({ data: "", contentType: "text/plain" }, undefined, undefined, undefined, undefined, undefined,
      false);
  }

  return view;
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

    // the view of the call that the results of the tab show in place of the results of the query, see toCall; the
    // number of the last call asked to be shown, the reading of its response, and the view chosen last in a view of a
    // call, which the next one shows too
    this.view = null;
    this.showing = 0;
    this.loading = null;
    this.plugin = null;

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

    // the actions of the panel on the results of the tab
    this.showCall = call => this.toCall(call);
    this.showQueryResults = () => this.toQueryResults();
    this.saveResponse = call => saveResponse(this.run, call);
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

    // the results of the tab show the run
    this.showing++;
    this.removeView();

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


  // the view of a call that had no response gets it once the call has finished, see completeView
  render(snapshot) {
    if(this.run !== snapshot.run)
      return;

    const view = this.view;
    const call = view && snapshot.run.calls.get(view.call);

    if(view && !view.answered && !view.completing && call?.state !== RUNNING && call?.httpStatus != null)
      this.completeView(snapshot.run, call, this.showing);

    const shown = view ? { call: view.call, truncated: view.truncated } : null;

    this.root?.render(<DebugPanel key={snapshot.number} snapshot={snapshot} onClose={() => this.close()}
      shown={shown} showCall={this.showCall} showQueryResults={this.showQueryResults}
      saveResponse={this.saveResponse}/>);
  }


  /*
   * Show a call in the results of the tab, also while the query runs, in the view chosen last in a view of a call (see
   * callView). The call gets a view of its own in place of the results of the tab, which stay hidden below it, so that
   * they go on showing the run of the query and then its results, and come back when the panel asks for them, when the
   * panel is closed and when the tab runs a query again. The view is not kept, so a reload shows the results of the
   * query too. Its download button saves its own results, which the component would not, as it saves those of the tab.
   * The response of a call is read before its view shows it, but when the raw request is the view chosen, the request
   * is shown at once, and the response comes later; only the call asked for last is shown.
   */
  async toCall(call) {
    const run = this.run;
    const results = this.tab.getYasr?.();

    if(!run || !results)
      return;

    const ticket = ++this.showing;
    const answered = call.state !== RUNNING && call.httpStatus != null;
    let content = null;

    if(answered && this.plugin !== rawRequest) {
      try {
        content = await this.readResponse(run, call);
      } catch(error) {
        // another call is asked for
        if(error.name === "AbortError")
          return;

        throw error;
      }
    }

    // the panel may have been closed, another query run, or another call asked for meanwhile
    if(this.run !== run || this.showing !== ticket)
      return;

    this.removeView();

    // the component may show the editor only
    const host = this.yasqe.rootEl.closest("ontotext-yasgui");

    if(host?.classList.contains("mode-yasqe"))
      Promise.resolve(host.changeRenderMode?.("mode-yasgui")).catch(() => {});

    const element = document.createElement("section");
    element.className = "idsm-debug-view";
    results.rootEl.after(element);
    results.rootEl.style.display = "none";

    let view;

    try {
      view = callView(this.tab, element, run, call, content, this.plugin);
    } catch(error) {
      element.remove();
      results.rootEl.style.display = "";
      throw error;
    }

    // the view chosen in a view of a call is shown for the next call too; Yasr tells about the views chosen, but it
    // may draw a view it does not offer, as for an error
    view.on("change", () => {
      const plugin = view.getSelectedPluginName();

      if(view.plugins[plugin] && !view.plugins[plugin].hideFromSelection)
        this.plugin = plugin;
    });

    element.addEventListener("internalDownloadAsEvent", event => {
      event.stopPropagation();
      downloadResults(view.results, event.detail?.payload?.value, `debug-${run.queryId}-${call.nodeId}`);
    });

    // the results of the tab drawn while hidden are drawn again when shown, as tables measure their columns
    const onDrawn = () => {
      if(this.view?.results === view)
        this.view.stale = true;
    };

    results.on("drawn", onDrawn);

    this.view = {
      element: element,
      results: view,
      call: call.nodeId,
      answered: !!content,
      truncated: !!content?.truncated,
      onDrawn: onDrawn,
    };

    if(answered && !content)
      this.completeView(run, call, ticket);

    this.render(run.snapshot);
    element.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }


  // the response of a call, at most responseLimit bytes of it; the reading stops when another call is asked for
  readResponse(run, call) {
    this.loading?.abort();
    this.loading = new AbortController();

    return run.content(call.nodeId, "response", responseLimit, this.loading.signal);
  }


  // the view of a call that has no response gets it, unless another call is asked for meanwhile
  async completeView(run, call, ticket) {
    const view = this.view;
    view.completing = true;

    let content;

    try {
      content = await this.readResponse(run, call);
    } catch(error) {
      // the view keeps showing the request
      return;
    }

    if(this.view !== view || this.showing !== ticket)
      return;

    setCallResponse(view.results, call, content, this.plugin);
    view.answered = true;
    view.truncated = content.truncated;
    this.render(run.snapshot);
  }


  // the results of the tab show the results of the query again
  toQueryResults() {
    this.showing++;
    this.removeView();

    if(this.run)
      this.render(this.run.snapshot);
  }


  removeView() {
    this.loading?.abort();
    this.loading = null;

    if(!this.view)
      return;

    const { element, results: view, onDrawn, stale } = this.view;

    // Yasr draws itself a while after it is made, which it should not do once destroyed
    view.destroy();
    view.results = undefined;
    element.remove();
    this.view = null;

    const results = this.tab.getYasr?.();

    if(results) {
      results.removeListener?.("drawn", onDrawn);
      results.rootEl.style.display = "";

      if(stale)
        results.refresh();
    }
  }


  // the close button of the panel ends the debugging of the tab, also a debug run going on, and the results of the tab
  // show the results of the query again
  close() {
    if(this.yasqe.req?.idsmDebug)
      this.yasqe.abortQuery();

    // the focus would fall to the page, so it goes to the debug button, or to the editor while the button is disabled
    if(this.host?.contains(document.activeElement))
      (this.button.disabled ? this.yasqe : this.button).focus();

    this.toQueryResults();
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
    this.removeView();
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
