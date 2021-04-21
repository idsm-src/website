import React from "react";
import YasguiJS from "@triply/yasgui";

import TablePlus from "./TablePlus";
import { builtinPrefixes, corsProxy } from "./config";

import "@triply/yasgui/build/yasgui.min.css";
import "./Yasgui.scss";


class Yasgui extends React.Component {

  constructor(props) {
    super(props);

    this.reference = React.createRef();
    this.yasgui = null;
  }


  componentDidMount() {
    this.yasgui = new YasguiJS(this.reference.current, {
      endpointCatalogueOptions: {
        getData: () => this.props.endpoints
      },
      yasqe : {
        value: this.props.defaultQuery
      },
      requestConfig: {
        endpoint: this.props.defaultEndpoint
      },
      copyEndpointOnNewTab: false,
      corsProxy: corsProxy
    });
  }


  render() {
    return <div ref={this.reference}/>;
  }


  demo(demo, run) {
    const tab = this.yasgui.addTab(true);
    tab.setEndpoint(demo.endpoint);
    tab.setName(demo.name);
    tab.setQuery(demo.query);

    if(run)
      tab.yasqe.query.call();
  }
}


YasguiJS.Yasr.registerPlugin("table", TablePlus);

YasguiJS.Yasqe.defaults.autocompleters.splice(YasguiJS.Yasqe.defaults.autocompleters.indexOf("prefixes"), 1);
YasguiJS.Yasqe.forkAutocompleter("prefixes", {
  name: "prefixes-local",
  persistenceId: null,
  get: () => {
    return new Promise(resolve => {
      resolve(Object.keys(builtinPrefixes).map(key => key + ": <" + builtinPrefixes[key] + ">"));
    });
  }
});


export default Yasgui;
