import React from "react";
import { Navbar, Nav, NavLink, NavbarBrand, Container, Row, Col, Modal, Image, Button } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap"
import { Helmet } from "react-helmet";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faAtom, faNetworkWired, faDatabase, faHome} from "@fortawesome/free-solid-svg-icons";

import Home from "./home/Home"
import Sachem from "./sachem/Sachem"
import Sparql from "./sparql/Sparql"

import idsmLogo from "./logo-idsm.svg";
import elixirLogo from "./logo-elixir.png";
import uochbLogo from "./logo-uochb.png";

import "./Website.scss";


function DataPrivacy() {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <Button variant="link" className="p-0" onClick={() => setShow(true)}>Data privacy</Button>

      <Modal centered size="lg" aria-labelledby="contained-modal-title-vcenter" show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">IDSM service data privacy</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-justify">
          <p>
            IDSM service is operated and maintained by <a target="_blank" rel="noreferrer"
            href="https://www.elixir-czech.cz/">ELIXIR CZ</a>. See also the <a target="_blank" rel="noreferrer"
            href="https://www.elixir-czech.cz/legal/terms-of-use">respective terms of use for all ELIXIR CZ services</a>.
          </p>
          <p>
            For planning and scientific review purposes, ELIXIR CZ will keep records of service usage. ELIXIR CZ may
            make information about the total volume of usage of particular software or databases to third parties
            organisations who supply the software or database contents.
          </p>
          <p>
            Logs of usage may also be maintained for the purposes of monitoring and improving services, and measuring
            the impact the particular services have on our resources.
          </p>
          <p>
            The logged information may include:
          </p>
          <ul>
            <li>timing information, including exact timestamp and service use duration</li>
            <li>network address (IP) used for communication with the service</li>
            <li>information provided by the user agent software, e.g. browser type and version</li>
            <li>content of queries submitted via the SPARQL interface</li>
          </ul>
          <p>
            These logs will not be made available to third parties for any purpose. We regard the nature of the
            communication carried out by any individual user as confidential, and shall make every reasonable attempt
            to prevent breaches of that confidentiality.
          </p>
          <p>
            ELIXIR CZ does not accept any responsibility for the consequences of any breach of the confidentiality of
            ELIXIR CZ site by third parties who, by any means, gain illegitimate access to the information.
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


function Contacts() {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <Button variant="link" className="p-0" onClick={() => setShow(true)}>Contacts</Button>

      <Modal centered size="lg" aria-labelledby="contained-modal-title-vcenter" show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">IDSM service contact information</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <dl>
            <dt>Maintainer</dt>
            <dd>Jakub Galgonek &lt;<a href="mailto:jakub.galgonek@uochb.cas.cz?subject=IDSM">jakub.galgonek@uochb.cas.cz</a>&gt;</dd>
            <dt>Research group</dt>
            <dd><a target="_blank" rel="noreferrer" href="https://bioinformatics.group.uochb.cz/en">Bioinformatics</a></dd>
            <dt>Institution</dt>
            <dd><a target="_blank" rel="noreferrer" href="https://www.uochb.cas.cz/en">IOCB Prague</a></dd>
            <dt>ELIXIR Hub</dt>
            <dd><a target="_blank" rel="noreferrer" href="https://www.elixir-czech.cz/">ELIXIR Czech Republic</a></dd>
          </dl>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


function Website() {
  return (
    <BrowserRouter>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <LinkContainer to="/"><NavbarBrand><img src={idsmLogo} height="32px" alt="IDSM"/></NavbarBrand></LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav activeKey={window.location.pathname} className="mr-auto">
            <LinkContainer to="/sachem"><NavLink><Icon icon={faAtom}/> Sachem GUI</NavLink></LinkContainer>
            <LinkContainer to="/sparql"><NavLink><Icon icon={faNetworkWired}/> SPARQL GUI</NavLink></LinkContainer>
            <NavLink href="/chemweb"><Icon icon={faDatabase}/> ChemWebRDF</NavLink>
          </Nav>
          <Nav>
            <NavLink target="_blank" rel="noreferrer" href="https://bioinformatics.group.uochb.cz/en">
              <Icon icon={faHome}/> Bioinformatics @ IOCB Prague
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="page">
        <Switch>
          <Route path="/sachem"><Helmet><title>IDSM / Sachem GUI</title></Helmet><Sachem/></Route>
          <Route path="/sparql"><Helmet><title>IDSM / SPARQL GUI</title></Helmet><Sparql/></Route>
          <Route path="/"><Helmet><title>IDSM - Integrated Database of Small Molecules</title></Helmet><Home/></Route>
        </Switch>
      </div>

      <Container fluid className="pt-1 mt-5 footer">
        <Row className="justify-content-center align-items-center">
          <Col lg="auto" md="auto" xs="auto" className="mb-1 px-4">
            <span>&copy; 2018&ndash;2021 <a target="_blank" rel="noreferrer" href="https://www.uochb.cz/en">IOCB Prague</a></span>
          </Col>
          <Col lg="auto" md="auto" xs={12} className="mb-0 p-0"/>
          <Col lg="auto" md="auto" xs="auto" className="mb-1 px-4">
            <DataPrivacy/>
          </Col>
          <Col lg="auto" md="auto" xs="auto" className="mb-1 px-4">
            <Contacts/>
          </Col>
          <Col lg="auto" md={12} xs={12} className="mb-0 p-0"/>
          <Col lg="auto" md="auto" xs="auto" className="mb-1 px-4">
            <a target="_blank" rel="noreferrer" href="https://www.uochb.cz/en" className="d-block p-1"><Image src={uochbLogo} height={40}/></a>
          </Col>
          <Col lg="auto" md="auto" xs="auto" className="mb-1 px-4">
            <a target="_blank" rel="noreferrer" href="https://www.elixir-czech.cz/" className="d-block p-1"><Image src={elixirLogo} height={40}/></a>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}


export default Website;
