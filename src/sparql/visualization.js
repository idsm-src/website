import { visualizers } from "./config";
import { escape } from "./escape";


/*
 * The cells of IRIs in the results table show the visualizations that the visualizers listed in config.js give.
 * A visualizer is an object of these members:
 *
 *   accepts(iri)     Optional: whether the visualizer may have a visualization of the IRI. It is called whenever the
 *                    table renders a cell of the IRI, so it has to be cheap. A visualizer without it is asked about
 *                    every IRI. An IRI gets the visualization of the first visualizer that accepts it.
 *
 *   placeholder(iri) Optional: the HTML shown in a cell of an accepted IRI until its visualization is there. It should
 *                    take the space of the visualization, since a row that grows when its visualization comes moves
 *                    what is shown below it. It is called for every cell of the IRI, so it has to be cheap.
 *
 *   visualize(iris)  The visualizations of the IRIs. The table asks about the IRIs of the cells that have come into
 *                    view together, so that the visualizer can get them by one request. It returns at once an array
 *                    that holds, at the index of each IRI, its visualization, null when it has none, or a promise of
 *                    either, and the table shows every visualization as soon as it is there, whatever the others do.
 *
 * A visualization is an object of these members:
 *
 *   html             The HTML shown in the cell before the IRI. It is inserted as it is, so the visualizer escapes
 *                    what it puts in. The same visualization may be shown in several cells, and again whenever the
 *                    table is drawn anew, so it is text, not a DOM node; an interactive one can be a custom element.
 *                    An image of the class "zoomable" is shown enlarged while the pointer is over it (see Yasgui.js).
 *
 *   link             Optional: the address the IRI links to instead of itself.
 *
 * The table keeps the visualizations it has got, so it asks a visualizer about an IRI once, unless the promise of its
 * visualization is rejected or the visualization has been dropped meanwhile to keep the number of them limited.
 */


// the element that stands in the cell of an IRI for its visualization
const elementName = "idsm-visualization";

// how long the cells that come into view are collected before their visualizations are asked for, so that the
// visualizations of the cells scrolled past are not asked for
const batchDelay = 100;

// how far from the view the cells count as being in view, so that their visualizations are there when they are
// scrolled to
const viewMargin = "500px";

// the number of the visualizations kept per visualizer
const cacheSize = 2000;


// the entries of the IRIs per visualizer, the most recently used last: { done, visualization, elements }, the
// elements waiting for a visualization that is not there yet
const entries = visualizers.map(() => new Map());

// the elements in view whose visualizations have not been asked for yet
const visible = new Set();

let observer = null;
let timer = null;


/*
 * The index of the first visualizer accepting the IRI, or -1. A visualizer that fails does not accept it.
 */
function findVisualizer(iri) {
  return visualizers.findIndex(visualizer => {
    try {
      return !visualizer.accepts || visualizer.accepts(iri);
    } catch(error) {
      console.error(error);
      return false;
    }
  });
}


/*
 * The entry of the IRI, which, if its visualization is there, becomes the most recently used one.
 */
function getEntry(visualizer, iri) {
  const cache = entries[visualizer];
  const entry = cache.get(iri);

  if(entry?.done) {
    cache.delete(iri);
    cache.set(iri, entry);
  }

  return entry;
}


/*
 * Finishes the entry of the IRI: the elements waiting for it show the visualization, and the visualization is kept
 * unless the visualizer has failed to give it.
 */
function finish(visualizer, iri, visualization, failed) {
  const cache = entries[visualizer];
  const entry = cache.get(iri);

  if(!entry || entry.done)
    return;

  cache.delete(iri);

  if(!failed) {
    entry.done = true;
    entry.visualization = visualization;
    cache.set(iri, entry);

    // the pending entries stay, as the elements wait for them
    for(const [key, value] of cache) {
      if(cache.size <= cacheSize)
        break;

      if(value.done)
        cache.delete(key);
    }
  }

  for(const element of entry.elements)
    element.show(visualization);

  entry.elements.clear();
}


/*
 * Asks the visualizer about the IRIs.
 */
function visualize(visualizer, iris) {
  let visualizations;

  try {
    visualizations = visualizers[visualizer].visualize(iris);

    if(!Array.isArray(visualizations))
      throw new TypeError("A visualizer did not return an array.");
  } catch(error) {
    console.error(error);

    for(const iri of iris)
      finish(visualizer, iri, null, true);

    return;
  }

  iris.forEach((iri, i) => {
    Promise.resolve(visualizations[i]).then(
      visualization => finish(visualizer, iri, visualization ?? null, false),
      error => {
        console.error(error);
        finish(visualizer, iri, null, true);
      });
  });
}


/*
 * Asks for the visualizations of the elements in view, each visualizer about its IRIs in one batch.
 */
function request() {
  const batches = visualizers.map(() => []);

  timer = null;

  for(const element of visible) {
    const { visualizer, iri } = element;
    const entry = getEntry(visualizer, iri);

    observer.unobserve(element);

    if(entry?.done) {
      element.show(entry.visualization);
    } else if(entry) {
      entry.elements.add(element);
    } else {
      entries[visualizer].set(iri, { done: false, visualization: null, elements: new Set([element]) });
      batches[visualizer].push(iri);
    }
  }

  visible.clear();

  batches.forEach((iris, visualizer) => {
    if(iris.length > 0)
      visualize(visualizer, iris);
  });
}


/*
 * The observer of the elements waiting to come into view.
 */
function getObserver() {
  observer ??= new IntersectionObserver(changes => {
    for(const change of changes) {
      if(change.isIntersecting)
        visible.add(change.target);
      else
        visible.delete(change.target);
    }

    if(visible.size > 0 && timer === null)
      timer = setTimeout(request, batchDelay);
  }, { rootMargin: viewMargin });

  return observer;
}


/*
 * The element that stands for the visualization of an IRI. It asks for the visualization once it comes into view, as
 * the table renders the cells of all its rows at once, and keeps it when the table moves its row.
 */
class Visualization extends HTMLElement {

  // the IRI and the index of its visualizer, known once the element has been connected
  iri = null;
  visualizer = -1;

  // whether the element shows the visualization, if there is any
  done = false;


  connectedCallback() {
    if(this.done)
      return;

    const connected = this.iri !== null;

    if(!connected) {
      this.iri = this.getAttribute("iri") ?? "";
      this.visualizer = findVisualizer(this.iri);
    }

    if(this.visualizer < 0) {
      this.done = true;
      return;
    }

    const entry = getEntry(this.visualizer, this.iri);

    if(entry?.done) {
      this.show(entry.visualization);
      return;
    }

    if(!connected)
      this.showPlaceholder();

    if(entry)
      entry.elements.add(this);
    else
      getObserver().observe(this);
  }


  disconnectedCallback() {
    if(this.done)
      return;

    observer?.unobserve(this);
    visible.delete(this);
    entries[this.visualizer].get(this.iri)?.elements.delete(this);
  }


  // shows the placeholder of the visualizer, if it gives any
  showPlaceholder() {
    const visualizer = visualizers[this.visualizer];

    try {
      const placeholder = visualizer.placeholder?.(this.iri);

      if(typeof placeholder === "string")
        this.innerHTML = placeholder;
    } catch(error) {
      console.error(error);
    }
  }


  /*
   * Shows the visualization in place of the placeholder, and makes the links of the IRI beside the element lead to
   * its address.
   */
  show(visualization) {
    this.done = true;
    this.innerHTML = typeof visualization?.html === "string" ? visualization.html : "";

    if(typeof visualization?.link === "string")
      for(const link of this.parentElement?.querySelectorAll("a.iri") ?? [])
        if(!this.contains(link))
          link.href = visualization.link;
  }
}


if(!customElements.get(elementName))
  customElements.define(elementName, Visualization);


/*
 * The element for the visualization of the IRI, or nothing when no visualizer accepts the IRI.
 */
function getVisualizationElement(iri) {
  return findVisualizer(iri) < 0 ? "" : `<${elementName} iri="${escape(iri)}"></${elementName}>`;
}


export { getVisualizationElement };
