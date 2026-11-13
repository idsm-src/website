import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

import { RUNNING, SUCCESS, ERROR, CANCELLED } from "./debugRun";

import "./DebugPanel.scss";


// how much of a request or a response is shown in its dialog; the whole of it can be saved
const contentLimit = 256 * 1024;

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


// a duration given in milliseconds, as text
function formatDuration(milliseconds) {
  if(milliseconds == null || Number.isNaN(milliseconds) || milliseconds < 0)
    return null;

  if(milliseconds < 1000)
    return `${Math.round(milliseconds)} ms`;

  if(milliseconds < 59950)
    return `${(milliseconds / 1000).toFixed(1)} s`;

  const seconds = Math.round(milliseconds / 1000);
  return `${Math.floor(seconds / 60)} min ${seconds % 60} s`;
}


function formatCount(count, noun) {
  return `${count.toLocaleString("en")} ${noun}${count === 1 ? "" : "s"}`;
}


// a message about an error of a request to the debugger: fetch rejects with a TypeError when there is no response
function messageOf(error) {
  return error.name === "TypeError" ? "The debugger cannot be reached." : error.message;
}


// the state of a call; a call left running when the run stopped without its final state is unfinished
function StateIcon({ state, settled }) {
  switch(state) {
    case RUNNING:
      return settled
        ? <i className="idsm-debug-state ri-question-line text-secondary" role="img" aria-label="Unfinished"
            title="Unfinished"/>
        : <Spinner animation="border" size="sm" className="idsm-debug-state" role="img" aria-label="Running"/>;
    case SUCCESS:
      return <i className="idsm-debug-state ri-checkbox-circle-fill text-success" role="img" aria-label="Succeeded"
        title="Succeeded"/>;
    case ERROR:
      return <i className="idsm-debug-state ri-close-circle-fill text-danger" role="img" aria-label="Failed"
        title="Failed"/>;
    case CANCELLED:
      return <i className="idsm-debug-state ri-indeterminate-circle-line text-secondary" role="img"
        aria-label="Cancelled" title="Cancelled"/>;
    default:
      return null;
  }
}


/*
 * The request or the response of a call in a dialog: the beginning of it, and a button that saves the whole of it. The
 * dialog lies above the page, so it closes when the browser goes back or forth in the history, as another page of the
 * website may be shown then.
 */
function CallContent({ run, call, kind, onHide }) {
  const [content, setContent] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [saving, setSaving] = React.useState(false);
  const [saveError, setSaveError] = React.useState(null);
  const titleId = React.useId();

  React.useEffect(() => {
    let current = true;

    run.content(call.nodeId, kind, contentLimit)
      .then(content => current && setContent(content))
      .catch(error => current && setError(messageOf(error)));

    return () => { current = false; };
  }, [run, call, kind]);

  React.useEffect(() => {
    window.addEventListener("popstate", onHide);
    return () => window.removeEventListener("popstate", onHide);
  }, [onHide]);

  const save = async () => {
    setSaving(true);
    setSaveError(null);

    try {
      const response = await fetch(run.contentUrl(call.nodeId, kind), { credentials: "omit" });

      if(!response.ok)
        throw new Error(`The debugger does not give the ${kind} (HTTP ${response.status}).`);

      const type = response.headers.get("Content-Type") ?? "";
      const extension = kind === "request" ? "txt" : extensions.find(([pattern]) => pattern.test(type))?.[1] ?? "txt";
      const link = document.createElement("a");
      link.href = URL.createObjectURL(await response.blob());
      link.download = `debug-${run.queryId}-${call.nodeId}-${kind}.${extension}`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(link.href));
    } catch(error) {
      setSaveError(messageOf(error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal show size="xl" scrollable onHide={onHide} className="idsm-debug-dialog" aria-labelledby={titleId}>
      <Modal.Header closeButton>
        <Modal.Title id={titleId}>
          {kind === "request" ? "Request to " : "Response of "}
          <span className="idsm-debug-endpoint">{call.endpoint}</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <p className="idsm-debug-error">{error}</p>}
        {!error && !content && <Spinner animation="border" variant="primary" className="d-block m-auto"/>}
        {!error && content && (
          <>
            {content.truncated &&
              <p className="text-secondary">
                Only the first {contentLimit / 1024} kB are shown, save the {kind} to see all.
              </p>}
            <pre className="idsm-debug-content" tabIndex={0}>{content.text}</pre>
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        {saveError && <p className="idsm-debug-error me-auto">{saveError}</p>}
        <Button variant="primary" onClick={save} disabled={saving}><i className="ri-download-2-line"/> Save</Button>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


/*
 * A call in the tree, or a group of the calls of one SERVICE clause by the same call, with the calls below it.
 */
function TreeItem({ item, snapshot, expanded, onToggle, onShow }) {
  const listId = React.useId();
  const data = item.call ?? item.group;
  const settled = snapshot.state !== "starting" && snapshot.state !== "running" && !snapshot.following;
  const hasChildren = item.children.length > 0 || item.omitted > 0;
  const isExpanded = hasChildren && (expanded.get(item.key) ?? !item.group);
  const time = data.endTime != null && data.startTime != null ? formatDuration(data.endTime - data.startTime) : null;
  const results = data.resultsCount != null && (!item.group || data.state !== RUNNING)
    ? formatCount(data.resultsCount, "result") : null;

  return (
    <li className={item.group ? "idsm-debug-group" : undefined}>
      <div className="idsm-debug-row">
        {hasChildren
          ? <button type="button" className="idsm-debug-toggle" aria-expanded={isExpanded} aria-controls={listId}
                aria-label={item.group ? `Calls of the group of ${data.endpoint}`
                  : `Calls of SERVICE clauses by ${data.endpoint}`}
                onClick={() => onToggle(item.key, !isExpanded)}>
              <i className={isExpanded ? "ri-arrow-down-s-line" : "ri-arrow-right-s-line"} aria-hidden="true"/>
            </button>
          : <span className="idsm-debug-toggle"/>}
        <StateIcon state={data.state} settled={settled}/>
        <span className="idsm-debug-endpoint" title={data.endpoint}>{data.endpoint}</span>

        <span className="idsm-debug-info">
          <span className="idsm-debug-details">
            {item.group
              ? <span className="idsm-debug-status" title="Calls of the SERVICE clause">
                  {formatCount(item.group.count, "call")}</span>
              : <span className={"idsm-debug-status" + (data.httpStatus >= 400 ? " text-danger" : "")}
                  title="HTTP status of the response">
                  {data.httpStatus != null ? `HTTP ${data.httpStatus}` : null}</span>}
            <span className="idsm-debug-time"
              title={item.group ? "From the start of the first call to the end of the last one" : "Duration"}>
              {time}</span>
            <span className="idsm-debug-results"
              title={item.group ? "Results of all the calls" : "Results of the response"}>{results}</span>
          </span>

          {/* a group has no request and response, but it keeps the room of their buttons to line up with the calls */}
          <span className={"idsm-debug-actions" + (item.group ? " invisible" : "")}>
            <Button variant="link" size="sm" disabled={!item.call || !snapshot.available}
                onClick={() => onShow(item.call, "request")}>Request</Button>
            <Button variant="link" size="sm" disabled={!item.call || !snapshot.available || data.state === RUNNING
                || data.httpStatus == null} onClick={() => onShow(item.call, "response")}>Response</Button>
          </span>
        </span>
      </div>

      {isExpanded && (
        <ul id={listId}>
          {item.children.map(child =>
            <TreeItem key={child.key} item={child} snapshot={snapshot} expanded={expanded} onToggle={onToggle}
              onShow={onShow}/>)}
          {item.omitted > 0 &&
            <li className="idsm-debug-omitted">{formatCount(item.omitted, "other call")} not listed</li>}
        </ul>
      )}
    </li>
  );
}


// the state of a run in a few words
function summaryOf(snapshot) {
  const root = snapshot.root?.call;
  const calls = formatCount(snapshot.count, "call");
  const time = formatDuration(snapshot.duration);

  switch(snapshot.state) {
    case "starting":
      return "starting…";
    case "running":
      return `running… ${calls}`;
    case "finished":
      if(root?.httpStatus == null)
        return "failed, the debugger cannot reach the endpoint";

      // calls of SERVICE clauses may still go on, see DebugRun.follow
      const going = snapshot.following && snapshot.runningCount ? `, ${snapshot.runningCount} still running` : "";

      if(root.state === ERROR)
        return `failed with HTTP ${root.httpStatus}${time ? ` in ${time}` : ""}, ${calls}${going}`;

      return `finished${time ? ` in ${time}` : ""}, ${calls}${going}`;
    case "cancelled":
      return "cancelled";
    default:
      return "failed";
  }
}


/*
 * The calls of a query run through the debugger, as they go on: the call of the endpoint, and below every call the
 * calls of the SERVICE clauses of its query, each with its request and response.
 */
function DebugPanel({ snapshot, onClose }) {
  const [expanded, setExpanded] = React.useState(() => new Map());
  const [shown, setShown] = React.useState(null);

  const toggle = React.useCallback((key, value) => setExpanded(expanded => new Map(expanded).set(key, value)), []);
  const show = React.useCallback((call, kind) => setShown({ call, kind }), []);
  const hide = React.useCallback(() => setShown(null), []);

  return (
    <section className="idsm-debug" aria-label="Query debugging">
      <header className="idsm-debug-header">
        <i className="ri-bug-line" aria-hidden="true"/>
        <span className="idsm-debug-title">Query debugging</span>
        <span className="idsm-debug-summary">{summaryOf(snapshot)}</span>
        <button type="button" className="btn-close" aria-label="Close the debugging" title="Close the debugging"
          onClick={onClose}/>
      </header>

      {snapshot.notes.map(note =>
        <p key={note} className="idsm-debug-note"><i className="ri-information-line" aria-hidden="true"/>{note}</p>)}
      {snapshot.error && <p className="idsm-debug-error">{snapshot.error}</p>}

      {snapshot.root && (
        <ul className="idsm-debug-tree" aria-label="Calls of the endpoints">
          <TreeItem item={snapshot.root} snapshot={snapshot} expanded={expanded} onToggle={toggle} onShow={show}/>
        </ul>
      )}

      {shown && <CallContent run={snapshot.run} call={shown.call} kind={shown.kind} onHide={hide}/>}
    </section>
  );
}


export default DebugPanel;
