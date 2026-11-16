import React from "react";
import { Button, Spinner } from "react-bootstrap";

import { RUNNING, SUCCESS, ERROR, CANCELLED } from "./debugRun";

import "./DebugPanel.scss";


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
 * A call in the tree, or a group of the calls of one SERVICE clause by the same call, with the calls below it. A call
 * has a button that shows it in the results of the tab, or hides it again when they show it; the call shown is
 * marked, or the collapsed item it lies in (see view in DebugPanel).
 */
function TreeItem({ item, snapshot, view, expanded, onToggle, onShow, onHide }) {
  const listId = React.useId();
  const data = item.call ?? item.group;
  const settled = snapshot.state !== "starting" && snapshot.state !== "running" && !snapshot.following;
  const shown = !!item.call && item.call.nodeId === view.shownCall;
  const loading = !!item.call && view.loading === item.call.nodeId;
  const hasChildren = item.children.length > 0 || item.omitted > 0;
  const isExpanded = hasChildren && (expanded.get(item.key) ?? !item.group);
  const marked = shown || (!isExpanded && view.path.has(item.key));
  const time = data.endTime != null && data.startTime != null ? formatDuration(data.endTime - data.startTime) : null;
  const results = data.resultsCount != null && (!item.group || data.state !== RUNNING)
    ? formatCount(data.resultsCount, "result") : null;

  return (
    <li className={item.group ? "idsm-debug-group" : undefined} aria-current={shown ? "true" : undefined}>
      <div className={"idsm-debug-row" + (marked ? " idsm-debug-in-results" : "")}>
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

          {/* a group cannot be shown, but it keeps the room of the button to line up with the calls */}
          <span className={"idsm-debug-actions" + (item.group ? " invisible" : "")}>
            <Button variant="link" size="sm" disabled={!item.call || (!shown && !snapshot.available)}
                title={shown ? "Show the results of the query again" : "Show the response and the request of the call "
                  + "in the results below"}
                aria-label={`${shown ? "Hide" : "Show"} the call of ${data.endpoint}`} aria-busy={loading || undefined}
                onClick={() => shown ? onHide() : onShow(item.call)}>
              <span className={shown || loading ? "invisible" : undefined}>Show</span>
              <span className={!shown || loading ? "invisible" : undefined}>Hide</span>
              {loading && <Spinner animation="border" size="sm" aria-hidden="true"/>}
            </Button>
          </span>
        </span>
      </div>

      {isExpanded && (
        <ul id={listId}>
          {item.children.map(child =>
            <TreeItem key={child.key} item={child} snapshot={snapshot} view={view} expanded={expanded}
              onToggle={onToggle} onShow={onShow} onHide={onHide}/>)}
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


// the keys of the items of the tree that a call lies in: its own, those of its ancestors, and those of their groups
function pathOf(calls, nodeId) {
  const keys = new Set();

  for(let call = calls.get(nodeId); call; call = call.parentNodeId != null ? calls.get(call.parentNodeId) : null) {
    keys.add(`call-${call.nodeId}`);

    if(call.parentNodeId != null)
      keys.add(`group-${call.parentNodeId}-${call.serviceCallId}`);
  }

  return keys;
}


/*
 * The calls of a query run through the debugger, as they go on: the call of the endpoint, and below every call the
 * calls of the SERVICE clauses of its query, each with its request and response, which showCall shows in the results
 * of the tab below in place of the results of the query, also while the query runs; showQueryResults brings them back.
 * The panel tells which call the results show (shown: the call, and whether its response is shown only in part, which
 * saveResponse saves whole), if any.
 */
function DebugPanel({ snapshot, onClose, shown, showCall, showQueryResults, saveResponse }) {
  const [expanded, setExpanded] = React.useState(() => new Map());
  const [loading, setLoading] = React.useState(null);
  const [error, setError] = React.useState(null);
  const section = React.useRef(null);

  const toggle = React.useCallback((key, value) => setExpanded(expanded => new Map(expanded).set(key, value)), []);

  const show = React.useCallback(async call => {
    setError(null);
    setLoading(call.nodeId);

    try {
      await showCall(call);
    } catch(error) {
      console.error(error);
      setError(`The call cannot be shown: ${error.message}`);
    } finally {
      setLoading(current => current === call.nodeId ? null : current);
    }
  }, [showCall]);

  const shownCall = shown?.call ?? null;
  const call = shownCall != null ? snapshot.run.calls.get(shownCall) : null;

  // an error of a call shown before is not kept
  React.useEffect(() => setError(null), [shownCall]);

  const view = React.useMemo(() => ({ shownCall, loading, path: pathOf(snapshot.run.calls, shownCall) }),
    [snapshot, shownCall, loading]);

  // the notice with the focused button goes away, so the focus goes to the panel
  const back = () => {
    section.current?.focus();
    showQueryResults();
  };

  const save = async () => {
    try {
      await saveResponse(call);
    } catch(error) {
      setError(`The response cannot be saved: ${error.message}`);
    }
  };

  const details = call && [call.httpStatus != null ? `HTTP ${call.httpStatus}` : null,
    call.endTime != null && call.startTime != null ? formatDuration(call.endTime - call.startTime) : null]
    .filter(detail => detail).join(", ");

  return (
    <section className="idsm-debug" aria-label="Query debugging" ref={section} tabIndex={-1}>
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
          <TreeItem item={snapshot.root} snapshot={snapshot} view={view} expanded={expanded} onToggle={toggle}
            onShow={show} onHide={showQueryResults}/>
        </ul>
      )}

      {error && <p className="idsm-debug-error">{error}</p>}

      <div role="status">
        {call && (
          <p className="idsm-debug-shown">
            <i className="ri-arrow-down-line" aria-hidden="true"/>
            Below is the call of <span className="idsm-debug-shown-endpoint">{call.endpoint}</span>
            {details ? ` (${details})` : ""}, its response and its request, not the results of the query.
            {shown.truncated && " Only the beginning of the response is shown."}
            {shown.truncated && <Button variant="link" size="sm" onClick={save}>Save the whole response</Button>}
            <Button variant="link" size="sm" onClick={back}>Show the results of the query</Button>
          </p>
        )}
      </div>
    </section>
  );
}


export default DebugPanel;
