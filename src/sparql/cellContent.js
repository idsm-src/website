import { servletBase } from "../config";


const PN_CHARS_BASE = `([A-Za-z\\u{00C0}-\\u{00D6}\\u{00D8}-\\u{00F6}\\u{00F8}-\\u{02FF}\\u{0370}-\\u{037D}\\u{037F}-\\u{1FFF}\\u{200C}-\\u{200D}\\u{2070}-\\u{218F}\\u{2C00}-\\u{2FEF}\\u{3001}-\\u{D7FF}\\u{F900}-\\u{FDCF}\\u{FDF0}-\\u{FFFD}\\u{10000}-\\u{EFFFF}])`;
const PN_CHARS_U = `(${PN_CHARS_BASE}|_)`;
const PN_CHARS = `(${PN_CHARS_U}|[-0-9\\u{00B7}\\u{0300}-\\u{036F}\\u{203F}-\\u{2040}])`;
const PERCENT = `(%[0-9A-Fa-f][0-9A-Fa-f])`;
const PN_LOCAL_ESC = `(\\\\[-_~.!$&'()*+,;=/?#@%])`;
const PLX = `(${PERCENT}|${PN_LOCAL_ESC})`;
const PN_LOCAL = `((${PN_CHARS_U}|[0-9:]|${PLX})((${PN_CHARS}|[.:]|${PLX})*(${PN_CHARS}|:|${PLX}))?)?`;
const localNameRegExp = new RegExp(`^${PN_LOCAL}$`, "u");


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


const htmlEscapes = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };


function escape(text) {
  return text.replace(/[&<>"']/g, c => htmlEscapes[c]);
}


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
 * Abbreviates the IRI by the prefix giving the shortest local name, the shorter prefix on a tie, as TablePlus did.
 */
function getVisibleIri(iri, prefixes) {
  let visible = null;
  let size = iri.length;

  for(const prefix in prefixes ?? {}) {
    const definition = prefixes[prefix];

    if(!definition || !iri.startsWith(definition))
      continue;

    const name = iri.substring(definition.length);

    if((size > name.length || (size === name.length && visible !== null && visible.length - size - 1 > prefix.length))
        && name.match(localNameRegExp)) {
      visible = prefix + ":" + name;
      size = name.length;
    }
  }

  return visible;
}


function getIriLink(iri, href, prefixes) {
  const visible = getVisibleIri(iri, prefixes);
  const link = `<a class="iri" target="_blank" rel="noopener noreferrer" href="${escape(href)}">${escape(visible ?? iri)}</a>`;

  return visible !== null ? link : `&lt;${link}&gt;`;
}


/*
 * Compounds get their images and spectra their charts, and their links lead to the source databases.
 */
function getDecoration(iri) {
  for(const e of compounds) {
    const m = iri.match(e.pattern);

    if(m)
      return { html: getImage(e.db, m[1]), link: e.link + m[1] };
  }

  for(const e of spectrum) {
    const m = iri.match(e.pattern);

    if(m)
      return { html: getChart(e.db, m[1]), link: e.link + m[1] };
  }

  for(const e of experiments) {
    const m = iri.match(e.pattern);

    if(m)
      return { html: getImage(e.db, m[1]) + getChart(e.db, m[1]), link: e.link + m[1] };
  }

  return null;
}


function getLiteralContent(binding, prefixes) {
  const value = `"<span class="literal-value">${escape(binding.value)}</span>"`;

  if(binding["xml:lang"]) {
    const direction = binding["its:dir"] ? "--" + binding["its:dir"] : "";
    return `${value}<sup>@${escape(binding["xml:lang"] + direction)}</sup>`;
  }

  if(binding.datatype)
    return `${value}<sup>^^${getIriLink(binding.datatype, binding.datatype, prefixes)}</sup>`;

  return value;
}


function getTermContent(binding, prefixes) {
  switch(binding.type) {
    case "uri":
      return getIriLink(binding.value, binding.value, prefixes);

    case "literal":
    case "typed-literal":
      return getLiteralContent(binding, prefixes);

    case "bnode":
      return `_:${escape(binding.value)}`;

    case "triple":
      return "&lt;&lt;( "
        + getTermContent(binding.value.subject, prefixes) + " "
        + getTermContent(binding.value.predicate, prefixes) + " "
        + getTermContent(binding.value.object, prefixes) + " )&gt;&gt;";

    default:
      return escape(String(binding.value));
  }
}


/*
 * The cell renderer of the ontotext-yasgui table. The term is kept apart from the images and charts, so that the
 * compact view of the table can shorten it alone.
 */
function getCellContent(binding, prefixes) {
  const decoration = binding.type === "uri" ? getDecoration(binding.value) : null;
  const term = decoration ? getIriLink(binding.value, decoration.link, prefixes) : getTermContent(binding, prefixes);

  return `<div class="idsm-cell">${decoration?.html ?? ""}<span class="idsm-term">${term}</span></div>`;
}


export { escape, getCellContent };
