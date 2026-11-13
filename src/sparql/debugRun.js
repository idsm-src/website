import { debuggerBase } from "../config";


// the states of the calls reported by the debugger, and the state of the calls left unfinished by a cancelled run
const RUNNING = "IN_PROGRESS";
const SUCCESS = "SUCCESS";
const ERROR = "ERROR";
const CANCELLED = "CANCELLED";

// a SERVICE clause called several times by one call is shown as a group of its calls, which lists at most this many
// calls of each state
const groupLimit = 50;

// how long the changes of the calls are collected before the tree is built again
const refreshDelay = 100;

// the debugger streams the changes of the calls, but the stream may stop without failing, as it has no heartbeat, so
// the whole tree is read now and then too, and more often once the stream has failed; a read that fails, or that the
// debugger does not answer in time, is tried again a few times before the run is given up
const watchInterval = 10000;
const pollInterval = 2000;
const readAttempts = 3;
const readTimeout = 15000;

// calls of SERVICE clauses may go on after the endpoint has answered, for example when it gave up waiting for them, so
// they are followed for a while
const followInterval = 3000;
const followTime = 120000;

// the number of the last run, which tells the runs apart
let lastNumber = 0;


// the error of a run that was cancelled, as fetch rejects an aborted request
function cancelledError() {
  return new DOMException("The query was cancelled", "AbortError");
}


// a message about an error of a request to the debugger: fetch rejects with a TypeError when there is no response
function messageOf(error, unreachable) {
  return error.name === "TypeError" ? unreachable : error.message;
}


// a call as reported, with the details of the same call reported before that the report lacks
function merged(known, call) {
  const result = { ...call };

  for(const [name, value] of Object.entries(known))
    if(result[name] == null || (Array.isArray(result[name]) && result[name].length === 0))
      result[name] = value;

  return result;
}


/*
 * A query run through the SPARQL debugger (https://github.com/iocbbioinf/sparql_debugger_server). The debugger sends
 * the query to its endpoint with the endpoints of the SERVICE clauses replaced by addresses of its own, so that the
 * calls of the services pass through it too, and it reports every call it forwards as a node of a tree: the call of the
 * endpoint at the root, the calls of the SERVICE clauses of a query below the call that sent the query. It keeps the
 * request and the response of every call, the response of the root being the result of the query.
 *
 * The run tells its changes to onChange, giving it the state to show (see makeSnapshot), and its result promises the
 * response of the endpoint once the root call finishes.
 */
class DebugRun {

  constructor({ endpoint, query, queryType, context, notes }, onChange) {
    this.number = ++lastNumber;
    this.endpoint = endpoint;
    this.query = query;
    this.queryType = queryType;
    this.context = context;
    this.notes = notes ?? [];
    this.onChange = onChange;

    // the state of the run: starting until the debugger accepts the query, then running, finished, failed (when the
    // debugger fails, not the endpoint) or cancelled
    this.state = "starting";
    this.error = null;
    this.queryId = null;
    this.calls = new Map();
    this.rootId = null;
    this.started = Date.now();
    this.duration = null;

    // whether the root call has finished and its response is read, whether calls going on after that are followed, and
    // whether the debugger has deleted the run
    this.finishing = false;
    this.following = false;
    this.deleted = false;

    this.events = null;
    this.watcher = null;
    this.follower = null;
    this.failures = 0;
    this.refresher = null;
    this.controller = new AbortController();

    this.result = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });

    // the rejection is handled by the caller of the run, if any
    this.result.catch(() => {});

    this.snapshot = this.makeSnapshot();
  }


  get active() {
    return this.state === "starting" || this.state === "running";
  }


  /*
   * Hand the query to the debugger, which starts the root call at once and answers the number of the run, and follow
   * the calls. The parameters go in the body, as a query would make the address too long. The request is not aborted
   * when the run is cancelled meanwhile, as the debugger would run the query anyway: the run is deleted once its number
   * is known.
   */
  async start() {
    if(this.state !== "starting" || this.posted)
      return;

    this.posted = true;

    const body = new URLSearchParams({
      endpoint: this.endpoint,
      query: this.query,
      requestcontext: JSON.stringify(this.context),
    });

    try {
      const response = await fetch(`${debuggerBase}/query`, { method: "POST", body: body, credentials: "omit" });

      // the debugger fails on some queries, and tells nothing about the cause
      if(!response.ok)
        throw new Error(`The debugger cannot run the query (HTTP ${response.status}). It cannot run, for example, `
          + "a SERVICE clause whose endpoint is given by a variable or by a prefix the query does not declare.");

      const queryId = Number(await response.text());

      if(!Number.isInteger(queryId))
        throw new Error("The debugger gave an unexpected answer.");

      this.queryId = queryId;
    } catch(error) {
      this.fail(messageOf(error, "The debugger cannot be reached."));
      return;
    }

    if(!this.active) {
      this.deleteQuery();
      return;
    }

    this.state = "running";
    this.listen();
    this.changed();
  }


  /*
   * Follow the changes of the calls, which the debugger streams as the calls start and finish, and which it keeps for a
   * stream that opens late. The debugger serves only one stream per run, so the stream is never opened again.
   */
  listen() {
    const events = new EventSource(`${debuggerBase}/query/${this.queryId}/sse`);
    this.events = events;

    events.onmessage = event => {
      try {
        this.update(JSON.parse(event.data));
      } catch(error) {
        console.warn("Unexpected message of the SPARQL debugger", error);
      }
    };

    events.onerror = () => {
      events.close();

      if(this.events === events) {
        this.events = null;

        if(this.active && !this.finishing)
          this.watch(pollInterval);
      }
    };

    this.watch(watchInterval);
  }


  // Read the whole tree after a while, see watchInterval
  watch(delay) {
    clearTimeout(this.watcher);
    this.watcher = setTimeout(() => this.check(), delay);
  }


  async check() {
    this.watcher = null;

    if(!this.active || this.finishing)
      return;

    try {
      await this.readTree();
      this.failures = 0;
    } catch(error) {
      if(!this.active || this.finishing)
        return;

      // while the stream works, it still tells the changes, unless the debugger answers that it does not know the run
      if((!this.events || error.answered) && ++this.failures >= readAttempts) {
        this.fail(messageOf(error, "The connection to the debugger was lost."));
        return;
      }
    }

    if(this.active && !this.finishing && this.watcher == null)
      this.watch(this.events ? watchInterval : pollInterval);
  }


  // Read the whole tree of the calls, as the debugger has it now; a read the debugger does not answer in time fails
  async readTree() {
    if(this.controller.signal.aborted)
      throw cancelledError();

    const controller = new AbortController();
    const abort = () => controller.abort();
    const timer = setTimeout(() => controller.abort(new Error("The debugger does not answer.")), readTimeout);

    this.controller.signal.addEventListener("abort", abort);

    try {
      const response = await fetch(`${debuggerBase}/query/${this.queryId}`, {
        credentials: "omit",
        signal: controller.signal,
      });

      clearTimeout(timer);

      if(!response.ok)
        throw Object.assign(new Error(`The debugger does not know the query any more (HTTP ${response.status}).`),
          { answered: true });

      const visit = node => {
        this.update(node.data);
        node.children?.forEach(visit);
      };

      visit((await response.json()).root);
    } finally {
      clearTimeout(timer);
      this.controller.signal.removeEventListener("abort", abort);
    }
  }


  update(call) {
    if(call.queryId !== this.queryId || !(this.active || this.following))
      return;

    // a call is reported once before it starts too
    if(call.state !== SUCCESS && call.state !== ERROR)
      call = { ...call, state: RUNNING };

    // the debugger changes a call only from running to finished, and it gives a finished call its state before its
    // other details, but a read of the tree may tell an older state than the stream did, so nothing is taken back
    const known = this.calls.get(call.nodeId);

    if(known && known.state !== RUNNING) {
      if(call.state === RUNNING)
        return;

      call = merged(known, call);
    }

    this.calls.set(call.nodeId, call);

    if(call.parentNodeId == null)
      this.rootId = call.nodeId;

    if(call.nodeId === this.rootId && call.state !== RUNNING && !this.finishing)
      this.finish();

    this.changed();
  }


  /*
   * The root call has finished: its response, which the debugger keeps with its type, is the result of the query, or
   * there is none when the debugger could not call the endpoint. The debugger sends the changes of the calls in no
   * particular order, so the final states of the other calls are read from the whole tree, if it can be read. A read
   * may also catch the root while the debugger fills in its details, so the tree is read again while the root has no
   * status, which it never gets when the endpoint could not be called.
   */
  async finish() {
    this.finishing = true;
    this.stopListening();

    for(let attempt = 0; attempt < readAttempts && this.active; attempt++) {
      if(attempt > 0)
        await new Promise(resolve => setTimeout(resolve, 500));

      await this.readTree().catch(() => {});

      const root = this.calls.get(this.rootId);

      if(root.httpStatus != null && root.endTime != null)
        break;
    }

    if(!this.active)
      return;

    const root = this.calls.get(this.rootId);
    let result = { status: 0, contentType: null, text: "" };

    if(root.endTime != null && root.startTime != null)
      this.duration = root.endTime - root.startTime;

    if(root.httpStatus != null) {
      try {
        const response = await this.retried(() => this.readText(this.contentUrl(root.nodeId, "response")));

        result = {
          status: root.httpStatus,
          contentType: root.contentType?.[0] ?? response.contentType,
          text: response.text,
        };
      } catch(error) {
        if(this.active)
          this.fail(messageOf(error, "The response of the endpoint cannot be read from the debugger."));

        return;
      }
    }

    if(!this.active)
      return;

    this.state = "finished";
    this.resolve(result);
    this.follow();
    this.changed();
  }


  /*
   * The response of the endpoint as text, read by an XMLHttpRequest, which decodes it as the request of a normal run
   * does: by the charset of its type, or by the declaration of an XML document.
   */
  readText(url) {
    return new Promise((resolve, reject) => {
      if(this.controller.signal.aborted) {
        reject(cancelledError());
        return;
      }

      const request = new XMLHttpRequest();
      const abort = () => request.abort();

      const settle = (settler, value) => {
        this.controller.signal.removeEventListener("abort", abort);
        settler(value);
      };

      request.onload = () => {
        if(request.status >= 200 && request.status < 300)
          settle(resolve, { text: request.responseText, contentType: request.getResponseHeader("Content-Type") });
        else
          settle(reject,
            new Error(`The debugger does not give the response of the endpoint (HTTP ${request.status}).`));
      };

      request.onerror = () => settle(reject, new TypeError("The debugger cannot be reached."));
      request.onabort = () => settle(reject, cancelledError());

      this.controller.signal.addEventListener("abort", abort);
      request.open("GET", url);
      request.send();
    });
  }


  // the result of a request to the debugger, which is sent again when it fails, up to readAttempts times
  async retried(send) {
    for(let attempt = 1; ; attempt++) {
      try {
        return await send();
      } catch(error) {
        if(attempt >= readAttempts || error.name === "AbortError")
          throw error;
      }

      await new Promise(resolve => setTimeout(resolve, 500 * attempt));
    }
  }


  /*
   * Follow the calls of SERVICE clauses that still go on after the endpoint has answered, until they finish, for
   * followTime at most; the calls that do not finish are then shown as unfinished.
   */
  follow() {
    const running = () => [...this.calls.values()].some(call => call.state === RUNNING);
    const until = Date.now() + followTime;
    let failures = 0;

    const read = async () => {
      this.follower = null;

      try {
        await this.readTree();
        failures = 0;
      } catch(error) {
        failures++;
      }

      if(!this.following)
        return;

      if(running() && Date.now() < until && failures < readAttempts)
        this.follower = setTimeout(read, followInterval);
      else
        this.stopFollowing();
    };

    if(running()) {
      this.following = true;
      this.follower = setTimeout(read, followInterval);
    }
  }


  stopFollowing() {
    if(!this.following)
      return;

    this.following = false;
    clearTimeout(this.follower);
    this.follower = null;
    this.changed();
  }


  // The run is given up, as the debugger failed; the calls not finished yet are shown as unfinished
  fail(message) {
    if(!this.active)
      return;

    this.state = "failed";
    this.error = message;
    this.stopListening();
    this.controller.abort();
    this.reject(new Error(message));
    this.changed();
  }


  /*
   * Stop the run: the debugger deletes the run, which stops the calls of the SERVICE clauses but not the call of the
   * endpoint, so the calls not finished yet are shown cancelled, and the requests and responses of the calls are no
   * longer available.
   */
  cancel() {
    if(!this.active)
      return;

    this.state = "cancelled";
    this.stopListening();
    this.controller.abort();
    this.deleteQuery();

    for(const [id, call] of this.calls)
      if(call.state === RUNNING)
        this.calls.set(id, { ...call, state: CANCELLED });

    this.reject(cancelledError());
    this.changed();
  }


  // The debugger deletes what it keeps of the run, which stays shown without the requests and responses of its calls
  release() {
    this.stopFollowing();

    if(this.active)
      this.cancel();
    else
      this.deleteQuery();

    this.changed();
  }


  // Forget the run: the debugger deletes what it keeps of it, and its changes are no longer told
  dispose() {
    this.stopFollowing();

    if(this.active)
      this.cancel();
    else
      this.deleteQuery();

    this.onChange = null;
    clearTimeout(this.refresher);
  }


  deleteQuery() {
    if(this.queryId == null || this.deleted)
      return;

    this.deleted = true;
    fetch(`${debuggerBase}/query/${this.queryId}/delete`, { method: "POST", credentials: "omit", keepalive: true })
      .catch(() => {});
  }


  stopListening() {
    this.events?.close();
    this.events = null;
    clearTimeout(this.watcher);
    this.watcher = null;
  }


  // the changes are shown after a short while, as calls of SERVICE clauses come in bursts
  changed() {
    if(this.refresher != null)
      return;

    this.refresher = setTimeout(() => {
      this.refresher = null;
      this.snapshot = this.makeSnapshot();
      this.onChange?.(this.snapshot);
    }, this.active ? refreshDelay : 0);
  }


  /*
   * The state to show: the tree of the calls, in which the calls of one SERVICE clause by one call make a group when
   * there are several, and some numbers about the run.
   */
  makeSnapshot() {
    return {
      run: this,
      number: this.number,
      state: this.state,
      following: this.following,
      error: this.error,
      notes: this.notes,
      queryId: this.queryId,
      duration: this.duration,
      root: this.rootId != null && this.calls.has(this.rootId) ? this.callTree() : null,
      count: this.calls.size,
      runningCount: [...this.calls.values()].filter(call => call.state === RUNNING).length,
      available: this.queryId != null && !this.deleted,
    };
  }


  callTree() {
    const children = new Map();

    for(const call of this.calls.values()) {
      if(call.parentNodeId == null)
        continue;

      if(!children.has(call.parentNodeId))
        children.set(call.parentNodeId, []);

      children.get(call.parentNodeId).push(call);
    }

    const byStart = (a, b) => (a.startTime ?? Infinity) - (b.startTime ?? Infinity) || a.nodeId - b.nodeId;

    const item = call => {
      const clauses = new Map();

      for(const child of (children.get(call.nodeId) ?? []).sort(byStart)) {
        if(!clauses.has(child.serviceCallId))
          clauses.set(child.serviceCallId, []);

        clauses.get(child.serviceCallId).push(child);
      }

      const items = [...clauses.values()].map(calls => calls.length === 1 ? item(calls[0]) : group(call, calls));

      return { key: `call-${call.nodeId}`, call: call, children: items, omitted: 0 };
    };

    const group = (parent, calls) => {
      const states = calls.map(call => call.state);
      const starts = calls.map(call => call.startTime).filter(time => time != null);
      const ends = calls.map(call => call.endTime).filter(time => time != null);
      const counts = calls.map(call => call.resultsCount).filter(count => count != null);

      // the calls that failed come first, then those still running, and at most groupLimit of each state are listed
      const listed = [];
      let omitted = 0;

      for(const state of [ERROR, RUNNING, CANCELLED, SUCCESS]) {
        const some = calls.filter(call => call.state === state);
        listed.push(...some.slice(0, groupLimit));
        omitted += Math.max(0, some.length - groupLimit);
      }

      return {
        key: `group-${parent.nodeId}-${calls[0].serviceCallId}`,
        group: {
          endpoint: calls[0].endpoint,
          count: calls.length,
          state: states.includes(RUNNING) ? RUNNING : states.includes(ERROR) ? ERROR
            : states.includes(CANCELLED) ? CANCELLED : SUCCESS,
          startTime: starts.length ? Math.min(...starts) : null,
          endTime: ends.length && !states.includes(RUNNING) ? Math.max(...ends) : null,
          resultsCount: counts.length ? counts.reduce((sum, count) => sum + count, 0) : null,
        },
        children: listed.map(item),
        omitted: omitted,
      };
    };

    // the debugger counts the results of the root call for any form of query, but only those of a SELECT query are
    // solutions; the calls of SERVICE clauses are SELECT queries
    const root = item(this.calls.get(this.rootId));

    if(this.queryType !== "SELECT")
      root.call = { ...root.call, resultsCount: null };

    return root;
  }


  /*
   * The request or the response of a call as text, at most limit bytes of it, and whether there is more; the debugger
   * keeps the request as a description of the call, with the query sent. The text is decoded by the charset of its
   * type, if it has one the browser knows.
   */
  async content(nodeId, kind, limit) {
    const response = await fetch(this.contentUrl(nodeId, kind), { credentials: "omit" });

    if(!response.ok)
      throw new Error(`The debugger does not give the ${kind} (HTTP ${response.status}).`);

    const type = response.headers.get("Content-Type") ?? "";
    const charset = /;\s*charset\s*=\s*"?([^";\s]+)/i.exec(type)?.[1];
    let decoder;

    try {
      decoder = new TextDecoder(charset ?? "utf-8");
    } catch(error) {
      decoder = new TextDecoder();
    }

    const reader = response.body.getReader();
    let text = "";
    let size = 0;
    let truncated = false;

    for(;;) {
      const { done, value } = await reader.read();

      if(done)
        break;

      if(size + value.length > limit) {
        text += decoder.decode(value.subarray(0, limit - size), { stream: true });
        truncated = true;
        reader.cancel().catch(() => {});
        break;
      }

      size += value.length;
      text += decoder.decode(value, { stream: true });
    }

    // a character cut at the limit is left out
    if(!truncated)
      text += decoder.decode();

    return { text: text, truncated: truncated, contentType: type };
  }


  // the address of the whole request or response of a call
  contentUrl(nodeId, kind) {
    return `${debuggerBase}/query/${this.queryId}/call/${nodeId}/${kind}`;
  }
}


export { DebugRun, RUNNING, SUCCESS, ERROR, CANCELLED };
