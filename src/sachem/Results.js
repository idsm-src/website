import React from "react";
import { useHistory } from "react-router-dom";
import { Alert, Button, ButtonGroup, Card, Container, Row, Col, OverlayTrigger, Popover, Spinner, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faAngleUp, faAngleDown, faImage, faEdit, faTable, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import { makeHash } from "./hash.js";
import { search, getQuery, getEndpoint, getDownloadLink, getCompoundStructure } from "./idsm.js";


function Compound(props) {
  const history = useHistory();

  const [loading, setLoading] = React.useState(false);

  function editMol() {
    setLoading(true);

    getCompoundStructure(props.iri)
    .then(mol => {
      history.push("/search/" + makeHash(mol, props.params));
    })
    .catch(err => {
      console.log("mol retrieval error: " + err);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <Card className="compound-card">
      <div className="text-right">
        <OverlayTrigger overlay={<Tooltip>View larger image</Tooltip>}>
          <a href={props.img(1000)} target="_blank" rel="noopener noreferrer" className="mr-2 badge badge-light">
            <Icon icon={faImage}/>
          </a>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip>Search for this structure</Tooltip>}>
          <span onClick={editMol} className="badge badge-light c-pointer">
            {loading
              ? <Spinner animation="border" variant="secondary" className="spinner"/>
              : <Icon icon={faEdit}/>
            }
          </span>
        </OverlayTrigger>
      </div>

      <OverlayTrigger placement="bottom"
        overlay={
          <Popover className="compound-tooltip">
            <img loading="lazy" alt="" src={props.img(840)}/>
          </Popover>
        }>
        <img loading="lazy" alt="" src={props.img(320)} className="card-img-top"/>
      </OverlayTrigger>

      <Card.Body className="text-center">
        <div>
          <a href={props.link} target="_blank" rel="noopener noreferrer">{props.label}</a>
        </div>
        {props.score &&
          <div className="text-muted">
            Score: {parseFloat(props.score).toFixed(3)}
          </div>
        }
      </Card.Body>
    </Card>
  );
}


function Results(props) {
  const queryLimit = 6 * 16;
  const history = useHistory();

  const [errorMsg, setErrorMsg] = React.useState(null);
  const [results, setResults] = React.useState([]);
  const [warnings, setWarnings] = React.useState([]);
  const [showSPARQL, setShowSPARQL] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [lastReached, setLastReached] = React.useState(false);
  const [showWarnings, setShowWarnings] = React.useState(true);

  function loadResults() {
    setLoading(true);

    search(props.query, props.params, 0, queryLimit)
    .then(result => {
      setLoading(false);
      setLastReached(result.done);
      setResults(r=>r.concat(result.compounds));
      setWarnings(w=>[...new Set(w.concat(result.warnings))]);
    })
    .catch(err => {
      setLoading(false);
      setLastReached(true);
      setErrorMsg(err.toString());
    });
  }

  React.useEffect(loadResults, [props, queryLimit]);

  return (
    <Container className="sachem-results">
      <Row className="mt-3">
        <Col>
          <h1 className="display-4 text-nowrap">Search results</h1>
        </Col>
        <Col sm="auto" ml="auto">
          <Button variant="outline-primary" onClick={() => history.push("/search/" + makeHash(props.query, props.params))}>
            <Icon icon={faAngleDoubleLeft}/> Edit this search
          </Button>

          {warnings.length > 0 && !showWarnings &&
            <Button variant="outline-danger" className="ml-3" onClick={() => setShowWarnings(true)}>
              <Icon icon={faExclamationTriangle}/> Show warnings
            </Button>
          }

          <ButtonGroup className="ml-3">
            <a href={getDownloadLink(props.query, props.params)}>
              <Button variant="outline-secondary">
                <Icon icon={faTable}/> Get CSV
              </Button>
            </a>
            <Button variant="outline-secondary" onClick={() => setShowSPARQL(!showSPARQL)}>
              SPARQL <Icon icon={showSPARQL ? faAngleUp : faAngleDown}/>
            </Button>
          </ButtonGroup>
        </Col>
      </Row>

      {showSPARQL &&
        <>
        <pre>#endpoint: ${getEndpoint(props.params)}{"\n\n"}${getQuery(props.query, props.params)}</pre>
        <hr/>
        </>
      }

      {warnings.length > 0 && showWarnings &&
        <Row>
          <Col>
            <Alert variant="danger" dismissible onClose={() => setShowWarnings(false)}>
              The following {warnings.length} warning{warnings > 1 ? "s were" : " was"} returned:
              <lu>
              {warnings.map((w) => (
                <li key={w} className="warning">{w}</li>
              ))}
              </lu>
            </Alert>
          </Col>
        </Row>
      }

      <div className="mt-1 d-flex flex-wrap">
        {results.map((r) => (
          <Compound {...r} key={r.db + ":" + r.id} params={props.params}/>
        ))}
      </div>

      {lastReached && !errorMsg && !loading && results.length > 0 &&
        <center>
          <hr/>
          <div className="mt-4">No more results</div>
        </center>
      }

      {lastReached && !errorMsg && !loading && results.length === 0 &&
        <Alert variant="info">No results found</Alert>
      }

      {errorMsg &&
        <Alert variant="danger">Server returned an error: {errorMsg}</Alert>
      }

      {loading &&
        <center className="mt-4">
          <Spinner animation="border" variant="primary" className="spinner d-block"/>
          <p className="mt-3">Searching...</p>
        </center>
      }

      {!loading && !errorMsg && !lastReached &&
        <center>
          <Button onClick={loadResults} variant="primary" className="mt-3">
            Load more results
          </Button>
        </center>
      }
    </Container>
  );
}


export default Results;