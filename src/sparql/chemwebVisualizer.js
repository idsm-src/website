import { servletBase } from "../config";
import { escape } from "./escape";


const compounds = [
  {
    db: "drugbank",
    pattern: /^http:\/\/wifo5-04\.informatik\.uni-mannheim\.de\/drugbank\/resource\/drugs\/DB([0-9]+)$/,
    link: "https://go.drugbank.com/drugs/DB"
  },{
    db: "chebi",
    pattern: /^http:\/\/purl\.obolibrary\.org\/obo\/CHEBI_([0-9]+)$/,
    link: "https://www.ebi.ac.uk/chebi/searchId.do?chebiId=CHEBI:"
  },{
    db: "chembl",
    pattern: /^http:\/\/rdf\.ebi\.ac\.uk\/resource\/chembl\/molecule\/CHEMBL([0-9]+)$/,
    link: "https://www.ebi.ac.uk/chembl/compound_report_card/CHEMBL"
  },{
    db: "pubchem",
    pattern: /^http:\/\/rdf\.ncbi\.nlm\.nih\.gov\/pubchem\/compound\/CID([0-9]+)$/,
    link: "https://pubchem.ncbi.nlm.nih.gov/compound/"
  },{
    db: "wikidata",
    pattern: /^http:\/\/www\.wikidata\.org\/entity\/Q([0-9]+)$/,
    link: "http://www.wikidata.org/entity/Q"
  },{
    db: "mona",
    pattern: /^https:\/\/idsm\.elixir-czech\.cz\/rdf\/mona\/(.*)_CMPD$/,
    link: "https://mona.fiehnlab.ucdavis.edu/spectra/display/"
  }
]


const spectrum = [
  {
    db: "mona",
    pattern: /^https:\/\/idsm\.elixir-czech\.cz\/rdf\/mona\/(.*)_MS$/,
    link: "https://mona.fiehnlab.ucdavis.edu/spectra/display/"
  },{
    db: "isdb",
    pattern: /^https:\/\/idsm\.elixir-czech\.cz\/rdf\/isdb\/(.*)_MS$/,
    link: "https://zenodo.org/records/8287341?id="
  }
]


const experiments =  [
  {
    db: "mona",
    pattern: /^https:\/\/idsm\.elixir-czech\.cz\/rdf\/mona\/(.*)_EXP$/,
    link: "https://mona.fiehnlab.ucdavis.edu/spectra/display/"
  },{
    db: "isdb",
    pattern: /^https:\/\/idsm\.elixir-czech\.cz\/rdf\/isdb\/(.*)_EXP$/,
    link: "https://zenodo.org/records/8287341?id="
  }
]


function getImgUri(db, id, size) {
  return `${servletBase}/${db}/compound/image?id=${encodeURIComponent(id)}&w=${size}`;
}


function getMSUri(db, id) {
  return `${servletBase}/ms.html#n/${db}/${encodeURIComponent(id)}`;
}


function getImage(db, id) {
  return `<a target="_blank" rel="noopener noreferrer" href="${escape(getImgUri(db, id, 1000))}" class="d-inline-block">`
    + `<img class="zoomable" alt="" src="${escape(getImgUri(db, id, 400))}" loading="lazy" onerror="this.style.display='none'"></a>`;
}


function getChart(db, id) {
  return `<iframe class="ms-chart" src="${escape(getMSUri(db, id))}" title="MS Chart" loading="lazy" width="100" height="60" scrolling="no"></iframe>`;
}


/*
 * The kind of the item that the IRI denotes (compound, spectrum or experiment), its database, its identifier and the
 * link to it in the source database, or null.
 */
function find(iri) {
  for(const [kind, items] of [["compound", compounds], ["spectrum", spectrum], ["experiment", experiments]]) {
    for(const e of items) {
      const m = iri.match(e.pattern);

      if(m)
        return { kind, db: e.db, id: m[1], link: e.link + m[1] };
    }
  }

  return null;
}


/*
 * Compounds get their images, spectra their charts and experiments both, and their links lead to the source
 * databases.
 */
function getVisualization(iri) {
  const item = find(iri);

  if(!item)
    return null;

  const image = item.kind !== "spectrum" ? getImage(item.db, item.id) : "";
  const chart = item.kind !== "compound" ? getChart(item.db, item.id) : "";

  return { html: image + chart, link: item.link };
}


/*
 * The empty boxes of the image and the chart, which take their space (see Yasgui.scss).
 */
function getPlaceholder(iri) {
  const item = find(iri);

  if(!item)
    return "";

  const image = item.kind !== "spectrum" ? '<span class="zoomable"></span>' : "";
  const chart = item.kind !== "compound" ? '<span class="ms-chart"></span>' : "";

  return image + chart;
}


/*
 * The visualizer of the compounds, spectra and experiments of the databases of IDSM, see visualization.js. The
 * images and charts come from the chemweb servlet, which the browser asks itself, so the visualizations are given at
 * once.
 */
const chemwebVisualizer = {
  accepts: iri => find(iri) !== null,
  placeholder: getPlaceholder,
  visualize: iris => iris.map(getVisualization),
};


export default chemwebVisualizer;
