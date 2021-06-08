import React from "react";
import { Container, Row, Col, Accordion, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faBook, faInfoCircle, faServer, faPlay, faEdit } from "@fortawesome/free-solid-svg-icons";

import { trackPageView } from "../matomo.js"

import Yasgui from "./Yasgui"
import Statistics from "./Statistics"
import Status from "./Status"
import { servletBase } from "../config";
import { endpoints, defaultEndpoint, defaultQuery } from "./config";
import { demoQueries } from "./demos";

import "./Sparql.scss";


function Sparql() {
  React.useEffect(() => {
    document.title = "IDSM / SPARQL GUI";
    trackPageView();
  }, []);

  const yasgui = React.useRef(null);

  return (
    <Container fluid className="mt-3">
      <Row>
        <Col xl={3} lg={4} md={5} sm={12} className="sparql-panel mb-4">

          <h2>IDSM SPARQL endpoints</h2>
          <p className="text-justify">
            This page allows you to access the IDSM functionality through a SPARQL web-interface (on the right), and connect the search results to the data from other services. For a quick start, you may select a query example from the list below.
          </p>
          <p>
            <a target="_blank" href="/sparql/doc/manual.html"><Icon icon={faBook}/> User manual is available.</a>
          </p>

          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="outline-success" block eventKey={'0'}>
                  <Icon icon={faInfoCircle}/> Database status
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={'0'}>
                <Card.Body className="mt-2">
                  <Statistics url={servletBase + "/endpoint/statistics.json"}/>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>

          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="outline-success" block eventKey={'0'}>
                  <Icon icon={faServer}/> SPARQL endpoint status
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={'0'}>
                <Card.Body className="mt-2">
                  <Status endpoints={endpoints}/>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>

          <Accordion>
            {
              demoQueries.map((group, index) =>
                <Card key={'' + index}>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="outline-primary" block eventKey={'' + index}>
                      {group.name}
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey={'' + index}>
                    <Card.Body className="demo-section">
                      <p className="text-justify">{group.description}</p>
                      {
                        group.queries.map((demo, subindex) =>
                          <Accordion key={'' + subindex}>
                            <Card>
                              <Card.Header>
                                <Accordion.Toggle as={Button} variant="outline-secondary" block eventKey={'' + subindex}>
                                  {demo.name}
                                </Accordion.Toggle>
                              </Card.Header>
                              <Accordion.Collapse eventKey={'' + subindex}>
                                <Card.Body>
                                  <p className="text-justify">{demo.description}</p>
                                  <Button onClick={() => {yasgui.current.demo(demo, true)}}><Icon icon={faPlay}/> Run demo</Button>
                                  {' '}
                                  <Button variant="secondary" onClick={() => {yasgui.current.demo(demo, false)}}><Icon icon={faEdit}/> Edit query</Button>
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          </Accordion>
                        )
                      }
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              )
            }
          </Accordion>
        </Col>

        <Col xl={9} lg={8} md={7} sm={12} style={{position: "inherit"}}>
          <Yasgui ref={yasgui} endpoints={endpoints} defaultEndpoint={defaultEndpoint} defaultQuery={defaultQuery}/>
        </Col>
      </Row>
    </Container>
  );
}


export default Sparql;
