const htmlEscapes = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };


/*
 * Escapes the text for HTML, the values of attributes included.
 */
function escape(text) {
  return text.replace(/[&<>"']/g, c => htmlEscapes[c]);
}


export { escape };
