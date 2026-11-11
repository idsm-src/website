import React from "react";
import { Form, Spinner } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";

import { usePageView } from "../section.js"

import { SparqlOverview, loadOverview } from "@sib-swiss/sparql-overview";
import { defaultEndpoint, endpointChoices, optionsFor } from "./config";

import "./Overview.scss";


// a message the overview shows over the classes, as HTML
function paragraph(text) {
  const escaped = String(text).replace(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`);
  return `<p class="m-0">${escaped}</p>`;
}


// the search part of the URL of the page showing an endpoint
function searchOf(endpoint) {
  return endpoint === defaultEndpoint ? "" : "?endpoint=" + encodeURIComponent(endpoint);
}


function Overview() {
  usePageView("IDSM / Data overview");

  const [searchParams] = useSearchParams();
  const endpoint = searchParams.get("endpoint") || defaultEndpoint;
  const navigate = useNavigate();

  // the element the overview draws in, which React leaves empty
  const host = React.useRef(null);

  // the overview shown and its endpoint, the controller of the loading of another endpoint while it goes on, and the
  // number of the last endpoint asked for
  const overview = React.useRef(null);
  const shown = React.useRef(null);
  const loading = React.useRef(null);
  const generation = React.useRef(0);

  // what is shown before the first overview: a message, and the choice of another endpoint after an error
  const [status, setStatus] = React.useState(null);

  // Show an endpoint in place of the one shown, which stays, with a message, until the new one is loaded (or with the
  // error, when it cannot be), and give the page its URL, as a new entry of the history when asked
  const show = React.useCallback((endpoint, push) => {
    loading.current?.abort("Another endpoint is shown");
    const controller = new AbortController();
    const current = ++generation.current;
    loading.current = controller;

    const progress = text => {
      if(overview.current)
        overview.current.displayMsg(paragraph(text));
      else
        setStatus({ message: text });
    };

    loadOverview(endpoint, { signal: controller.signal, onProgress: progress })
      .then(({ voidBindings, prefixes, ...description }) => {
        if(controller.signal.aborted)
          return;

        loading.current = null;
        overview.current?.destroy();
        setStatus(null);

        overview.current = new SparqlOverview(host.current, { [endpoint]: voidBindings }, prefixes, {
          ...optionsFor(endpoint),
          ...description,
          endpointChoices,
          onEndpointChoice: url => show(url, true),
        });
        shown.current = endpoint;

        if(push)
          navigate({ search: searchOf(endpoint) });
      })
      .catch(error => {
        if(controller.signal.aborted)
          return;

        loading.current = null;
        const message = `Cannot load the VoID description of ${endpoint}: ${error}`;

        if(overview.current) {
          // the classes shown stay
          overview.current.displayMsg(paragraph(message), true);
          setTimeout(() => generation.current === current && overview.current?.displayMsg(), 8000);
        } else {
          setStatus({ message, error: true });
        }
      });
  }, [navigate]);

  // the endpoint of the URL, also when going back or forward in the history
  React.useEffect(() => {
    if(endpoint !== shown.current) {
      show(endpoint, false);
    } else if(loading.current) {
      // back at the endpoint shown while another one is being loaded
      loading.current.abort("Another endpoint is shown");
      loading.current = null;
      overview.current?.displayMsg();
    }
  }, [endpoint, show]);

  // the overview is taken down when the page is left
  React.useEffect(() => () => {
    loading.current?.abort("The page is left");
    loading.current = null;
    overview.current?.destroy();
    overview.current = null;
    shown.current = null;
  }, []);

  return (
    <div className="overview-page">
      <div ref={host} className="overview-host"/>
      {
        status &&
          <div className="overview-status">
            {!status.error && <Spinner animation="border" variant="primary"/>}
            <p className={status.error ? "text-danger" : ""}>{status.message}</p>
            {
              status.error &&
                <Form.Select className="w-auto" value="" onChange={e => e.target.value && show(e.target.value, true)}>
                  <option value="">Show another endpoint&hellip;</option>
                  {endpointChoices.map(({ name, url }) => <option key={url} value={url}>{name}</option>)}
                </Form.Select>
            }
          </div>
      }
    </div>
  );
}


export default Overview;
