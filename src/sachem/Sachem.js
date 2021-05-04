import React from "react";
import { HashRouter as Router, Switch, Route, Redirect, useParams } from "react-router-dom";

import Search from "./Search.js";
import Results from "./Results.js";
import { parseHash } from "./hash.js";

import "./Sachem.scss"


function Sachem() {
  return (
    <Router>
      <Switch>
        <Route path="/search/:hash?">
          <SearchPage/>
        </Route>
        <Route path="/results/:hash">
          <ResultsPage/>
        </Route>
        <Route path="/">
          <Redirect to="/search"/>
        </Route>
      </Switch>
    </Router>
  );
}


function SearchPage() {
  var { mol, params } = parseHash(useParams()["hash"]);

  return <Search defaultQuery={mol} defaultParams={params}/>
}


function ResultsPage() {
  var { mol, params } = parseHash(useParams()["hash"]);

  if(mol == null)
    return <Redirect to="/search"/>;

  return <Results query={mol} params={params}/>;
}


export default Sachem;
