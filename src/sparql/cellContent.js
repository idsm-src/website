import { escape } from "./escape";
import { getVisualizationElement } from "./visualization";


const PN_CHARS_BASE = `([A-Za-z\\u{00C0}-\\u{00D6}\\u{00D8}-\\u{00F6}\\u{00F8}-\\u{02FF}\\u{0370}-\\u{037D}\\u{037F}-\\u{1FFF}\\u{200C}-\\u{200D}\\u{2070}-\\u{218F}\\u{2C00}-\\u{2FEF}\\u{3001}-\\u{D7FF}\\u{F900}-\\u{FDCF}\\u{FDF0}-\\u{FFFD}\\u{10000}-\\u{EFFFF}])`;
const PN_CHARS_U = `(${PN_CHARS_BASE}|_)`;
const PN_CHARS = `(${PN_CHARS_U}|[-0-9\\u{00B7}\\u{0300}-\\u{036F}\\u{203F}-\\u{2040}])`;
const PERCENT = `(%[0-9A-Fa-f][0-9A-Fa-f])`;
const PN_LOCAL_ESC = `(\\\\[-_~.!$&'()*+,;=/?#@%])`;
const PLX = `(${PERCENT}|${PN_LOCAL_ESC})`;
const PN_LOCAL = `((${PN_CHARS_U}|[0-9:]|${PLX})((${PN_CHARS}|[.:]|${PLX})*(${PN_CHARS}|:|${PLX}))?)?`;
const localNameRegExp = new RegExp(`^${PN_LOCAL}$`, "u");


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


function getIriLink(iri, prefixes) {
  const visible = getVisibleIri(iri, prefixes);
  const link = `<a class="iri" target="_blank" rel="noopener noreferrer" href="${escape(iri)}">${escape(visible ?? iri)}</a>`;

  return visible !== null ? link : `&lt;${link}&gt;`;
}


function getLiteralContent(binding, prefixes) {
  const value = `"<span class="literal-value">${escape(binding.value)}</span>"`;

  if(binding["xml:lang"]) {
    const direction = binding["its:dir"] ? "--" + binding["its:dir"] : "";
    return `${value}<sup>@${escape(binding["xml:lang"] + direction)}</sup>`;
  }

  if(binding.datatype)
    return `${value}<sup>^^${getIriLink(binding.datatype, prefixes)}</sup>`;

  return value;
}


function getTermContent(binding, prefixes) {
  switch(binding.type) {
    case "uri":
      return getIriLink(binding.value, prefixes);

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
 * The cell renderer of the ontotext-yasgui table. The term is kept apart from the visualization of an IRI (see
 * visualization.js), so that the compact view of the table can shorten it alone.
 */
function getCellContent(binding, prefixes) {
  const visualization = binding.type === "uri" ? getVisualizationElement(binding.value) : "";

  return `<div class="idsm-cell">${visualization}<span class="idsm-term">${getTermContent(binding, prefixes)}</span></div>`;
}


export { getCellContent };
