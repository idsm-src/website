/**
Copyright (c) 2021 Triply B.V.
Copyright (c) 2021 Jakub Galgonek

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/


import $ from "jquery";
import ReactDOM from 'react-dom';
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import { escape, cloneDeep } from "lodash-es";
import "datatables.net";
import ColumnResizer from "column-resizer";

import { servletBase } from "../config";
import { builtinPrefixes } from "./config";

import "./TablePlus.scss";
import "datatables.net-dt/css/jquery.dataTables.css";


const DEFAULT_PAGE_SIZE = 50;

const PN_CHARS_BASE = `([A-Za-z\\u{00C0}-\\u{00D6}\\u{00D8}-\\u{00F6}\\u{00F8}-\\u{02FF}\\u{0370}-\\u{037D}\\u{037F}-\\u{1FFF}\\u{200C}-\\u{200D}\\u{2070}-\\u{218F}\\u{2C00}-\\u{2FEF}\\u{3001}-\\u{D7FF}\\u{F900}-\\u{FDCF}\\u{FDF0}-\\u{FFFD}]|[\\u{D840}-\\u{DBBF}][\\u{DC00}–\\u{DFFF}])`;
const PN_CHARS_U = `(${PN_CHARS_BASE}|_)`;
const PN_CHARS = `(${PN_CHARS_U}|[-0-9\\u{00B7}\\u{0300}-\\u{036F}\\u{203F}-\\u{2040}])`;
const PERCENT = `(%[0-9A-Fa-f][0-9A-Fa-f])`;
const PN_LOCAL_ESC = `(\\\\[-_~.!$&'()*+,;=/?#@%])`;
const PLX = `(${PERCENT}|${PN_LOCAL_ESC})`;
const PN_LOCAL = `((${PN_CHARS_U}|[0-9:]|${PLX})((${PN_CHARS}|[.:]|${PLX})*(${PN_CHARS}|:|${PLX}))?)?`;
var localNameRegExp = new RegExp(`^${PN_LOCAL}$`,"u");


const patterns = {
  drugbank: /^http:\/\/wifo5-04\.informatik\.uni-mannheim\.de\/drugbank\/resource\/drugs\/DB([0-9]+)$/,
  chebi: /^http:\/\/purl\.obolibrary\.org\/obo\/CHEBI_([0-9]+)$/,
  chembl: /^http:\/\/rdf\.ebi\.ac\.uk\/resource\/chembl\/molecule\/CHEMBL([0-9]+)$/,
  pubchem: /^http:\/\/rdf\.ncbi\.nlm\.nih\.gov\/pubchem\/compound\/CID([0-9]+)$/,
  wikidata: /^http:\/\/www\.wikidata\.org\/entity\/Q([0-9]+)$/,
}


class TablePlus {
  config;
  persistentConfig = {};
  yasr;
  tableControls;
  dataTable;
  tableFilterField;
  tableSizeField;
  helpReference = "https://triply.cc/docs/yasgui#table";
  label = "Table+";
  priority = 10;


  static defaults = {
    openIriInNewWindow: true,
    tableConfig: {
      dom: "tip", // tip: Table, Page Information and Pager, change to ipt for showing pagination on top
      pageLength: DEFAULT_PAGE_SIZE, //default page length
      lengthChange: true, //allow changing page length
      data: [],
      columns: [],
      order: [],
      deferRender: true,
      orderClasses: false,
      language: {
        paginate: {
          first: "&lt;&lt;", // Have to specify these two due to TS defs, <<
          last: "&gt;&gt;", // Have to specify these two due to TS defs, >>
          next: "&gt;", // >
          previous: "&lt;", // <
        },
      },
    },
  }


  getIcon() {
    var svgContainer = document.createElement("div");
    svgContainer.className = "svgImg";
    ReactDOM.render(<Icon icon={faTable}/>, svgContainer);
    return svgContainer;
  }


  constructor(yasr) {
    this.yasr = yasr;
    //TODO read options from constructor
    this.config = cloneDeep(TablePlus.defaults);
  }


  getRows() {
    const rows = [];

    if(!this.yasr.results)
      return [];

    const bindings = this.yasr.results.getBindings();

    if(!bindings)
      return rows;

    const vars = this.yasr.results.getVariables();
    const prefixes = this.yasr.getPrefixes();

    for(let rowId = 0; rowId < bindings.length; rowId++) {
      const binding = bindings[rowId];
      const row = ["<div>" + (rowId + 1) + "</div>"];

      for(let colId = 0; colId < vars.length; colId++) {
        const sparqlVar = vars[colId];

        if(sparqlVar in binding)
          row.push(this.getCellContent(binding, sparqlVar, prefixes));
        else
          row.push("");
      }

      rows.push(row);
    }

    return rows;
  }


  getImgUri(db, id, size) {
    return `${servletBase}/${db}/compound/image?id=${id}&amp;w=${size}`;
  }


  getUriLinkFromBinding(binding, prefixes) {
    const href = binding.value;
    let visibleString = href;
    let prefixed = false;


    if(prefixes) {
      for(const prefixLabel in prefixes) {
        const definition = prefixes[prefixLabel];

        if(visibleString.indexOf(definition) === 0) {
          const name = href.substring(definition.length);

          if(!name.match(localNameRegExp))
            continue;

          visibleString = prefixLabel + ":" + name;
          prefixed = true;
          break;
        }
      }
    }

    if(!prefixed) {
      for(const prefixLabel in builtinPrefixes) {
        const definition = builtinPrefixes[prefixLabel];

        if(!prefixes[prefixLabel] && visibleString.indexOf(definition) === 0) {
          const name = href.substring(definition.length);

          if(!name.match(localNameRegExp))
            continue;

          visibleString = prefixLabel + ":" + name;
          prefixed = true;
          break;
        }
      }
    }

    let target = `${this.config.openIriInNewWindow ? '_blank ref="noopener noreferrer"' : "_self"}`;
    let link = `<a class='iri d-inline-block' target='${target}' href='${href}'>${prefixed ? "" : "&lt"}${visibleString}${prefixed ? "" : "&gt;"}</a>`;

    for(const db in patterns) {
      const m = href.match(patterns[db]);

      if(m)
        return `<a target='${target}' href='${this.getImgUri(db, m[1], 1000)}' class='d-inline-block'><img class='zoomable' src='${this.getImgUri(db, m[1], 400)}' loading='lazy' onerror='this.style.display="none"'></a>${link}`;
    }

    return link;
  }


  getCellContent(bindings, sparqlVar, prefixes) {
    const binding = bindings[sparqlVar];
    let content;

    if(binding.type === "uri")
      content = this.getUriLinkFromBinding(binding, prefixes);
    else
      content = `<span class='nonIri'>${this.formatLiteral(binding, prefixes)}</span>`;

    return "<div>" + content + "</div>";
  }


  formatLiteral(literalBinding, prefixes) {
    let stringRepresentation = escape(literalBinding.value);

    if(literalBinding["xml:lang"]) {
      stringRepresentation = `"${stringRepresentation}"<sup>@${literalBinding["xml:lang"]}</sup>`;
    } else if(literalBinding.datatype) {
      const dataType = this.getUriLinkFromBinding({ type: "uri", value: literalBinding.datatype }, prefixes);
      stringRepresentation = `"${stringRepresentation}"<sup>^^${dataType}</sup>`;
    }

    return stringRepresentation;
  }


  getColumns() {
    if(!this.yasr.results)
      return [];

    return [
      { name: "", searchable: false, width: this.getSizeFirstColumn(), sortable: false }, //prepend with row numbers column
      ...this.yasr.results?.getVariables().map((name) => {
        return { name: name, title: name };
      }),
    ];
  }


  getSizeFirstColumn() {
    const numResults = this.yasr.results?.getBindings()?.length || 0;

    if(numResults > 999)
      return "30px";
    else if(numResults > 99)
      return "20px";
    else
      return "10px";
  }


  draw(persistentConfig) {
    const table = document.createElement("table");
    const rows = this.getRows();
    const columns = this.getColumns();

    if(rows.length <= (persistentConfig?.pageSize || DEFAULT_PAGE_SIZE))
      this.yasr.rootEl.classList.add("isSinglePage");
    else
      this.yasr.rootEl.classList.remove("isSinglePage");

    if(this.dataTable) {
      this.dataTable.destroy(true);
      this.dataTable = undefined;
    }

    this.yasr.resultsEl.appendChild(table);

    // reset some default config properties as they couldn't be initialized beforehand
    this.config.tableConfig.pageLength = persistentConfig && persistentConfig.pageSize ? persistentConfig.pageSize : DEFAULT_PAGE_SIZE;
    this.config.tableConfig.data = rows;
    this.config.tableConfig.columns = columns;

    const dtConfig = { ...this.config.tableConfig };
    this.dataTable = $(table).DataTable(dtConfig);
    // .api();
    new ColumnResizer(table, { widths: [], partialRefresh: true });
    this.drawControls();
  }


  handleTableSearch = (event) => {
    this.dataTable?.search((event.target).value).draw();
  }


  handleTableSizeSelect = (event) => {
    const pageLength = parseInt((event.target).value);
    // Set page length
    this.dataTable?.page.len(pageLength).draw();
    // Store in persistentConfig
    this.persistentConfig.pageSize = pageLength;
    this.yasr.storePluginConfig("table", this.persistentConfig);
  }


  drawControls() {
    // Remove old header
    this.removeControls();
    this.tableControls = document.createElement("div");
    this.tableControls.className = "tableControls";
    // Create table filter
    this.tableFilterField = document.createElement("input");
    this.tableFilterField.className = "tableFilter";
    this.tableFilterField.placeholder = "Filter query results";
    this.tableControls.appendChild(this.tableFilterField);
    this.tableFilterField.addEventListener("keyup", this.handleTableSearch);

    // Create page wrapper
    const pageSizerWrapper = document.createElement("div");
    pageSizerWrapper.className = "pageSizeWrapper";

    // Create label for page size element
    const pageSizerLabel = document.createElement("span");
    pageSizerLabel.textContent = "Page size: ";
    pageSizerLabel.className = "pageSizerLabel";
    pageSizerWrapper.appendChild(pageSizerLabel);

    // Create page size element
    this.tableSizeField = document.createElement("select");
    this.tableSizeField.className = "tableSizer";

    // Create options for page sizer
    const options = [10, 50, 100, 1000, -1];

    for(const option of options) {
      const element = document.createElement("option");
      element.value = option + "";
      // -1 selects everything so we should call it All
      element.innerText = option > 0 ? option + "" : "All";
      // Set initial one as selected
      if(this.dataTable?.page.len() === option) element.selected = true;
      this.tableSizeField.appendChild(element);
    }

    pageSizerWrapper.appendChild(this.tableSizeField);
    this.tableSizeField.addEventListener("change", this.handleTableSizeSelect);
    this.tableControls.appendChild(pageSizerWrapper);
    this.yasr.pluginControls.appendChild(this.tableControls);
  }


  download(filename) {
    return {
      getData: () => this.yasr.results?.asCsv() || "",
      contentType: "text/csv",
      title: "Download result",
      filename: `${filename || "queryResults"}.csv`,
    };
  }


  canHandleResults() {
    return !!this.yasr.results && this.yasr.results.getVariables() && this.yasr.results.getVariables().length > 0;
  }


  removeControls() {
    // Unregister listeners and remove references to old fields
    this.tableFilterField?.removeEventListener("keyup", this.handleTableSearch);
    this.tableFilterField = undefined;
    this.tableSizeField?.removeEventListener("change", this.handleTableSizeSelect);
    this.tableSizeField = undefined;

    // Empty controls
    while(this.tableControls?.firstChild)
        this.tableControls.firstChild.remove();

    this.tableControls?.remove();
  }


  destroy() {
    this.removeControls();
    this.dataTable?.destroy(true);
    this.dataTable = undefined;
    this.yasr.rootEl.classList.remove("isSinglePage");
  }
}


export default TablePlus;
