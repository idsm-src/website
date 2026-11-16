/*
 * The visualizer of the IRIs that the templates of the template renderer (@idsm-src/template-renderer) visualize, see
 * visualization.js. A template is an Eta template of the HTML of the terms whose values match its pattern, and it may
 * query its SPARQL endpoint; the renderer joins the same queries of the templates rendered at about the same time
 * into one request. The renderer queries by the Comunica query engine, which is large, so both are loaded only when
 * the table asks for a visualization.
 */


// how long the renderer collects the queries of the templates before it sends them together; the table asks for the
// visualizations of the cells that have come into view at once, so their queries are made at once as well
const queryBatchWindow = 100;

// the variable that the renderer adds to the queries of the templates to tell their solutions apart, so it must not
// be used by any template
const queryIdentifierVariable = "idsmTemplateQuery";


/*
 * The query engine of the renderer. The renderer gives the engine the endpoints of the templates as bare addresses,
 * and Comunica identifies such a source by fetching it before every query; the service description of an endpoint of
 * IDSM takes seconds to make, so the engine is told that the addresses are SPARQL endpoints. The sources of the
 * templates themselves are given as objects (see load), which keep being identified.
 */
function createQueryEngine(QueryEngine) {
  const engine = new QueryEngine();
  const declare = context => ({
    ...context,
    sources: context?.sources?.map(source => typeof source === "string" ? { type: "sparql", value: source } : source),
  });

  return new Proxy(engine, {
    get(target, property) {
      const value = Reflect.get(target, property, target);

      if(typeof value !== "function")
        return value;

      if(property === "queryBindings" || property === "queryBoolean" || property === "query")
        return (query, context) => value.call(target, query, declare(context));

      return value.bind(target);
    },
  });
}


/*
 * Whether the renderer has a template of the IRI.
 */
function hasTemplate(renderer, iri) {
  return renderer.findTemplates(renderer.dataFactory.namedNode(iri)).length > 0;
}


/*
 * The visualizer of the IRIs by the templates of the sources, which are the addresses of RDF documents or SPARQL
 * endpoints holding them. The templates are code run in the page, so the sources have to be trusted.
 */
function createTemplateVisualizer(sources) {
  // the promise of the renderer with its templates, and the renderer once it is there
  let loading = null;
  let renderer = null;


  /*
   * The promise of the renderer with its templates. When it fails, the renderer is loaded anew the next time.
   */
  function load() {
    loading ??= Promise.all([import("@comunica/query-sparql"), import("@idsm-src/template-renderer")])
      .then(async ([{ QueryEngine }, { TemplateRenderer }]) => {
        const queryEngine = createQueryEngine(QueryEngine);
        const instance = new TemplateRenderer({ queryBatchWindow, queryEngine, queryIdentifierVariable });

        await instance.loadTemplates(sources.map(value => ({ value })));
        renderer = instance;

        return instance;
      })
      .catch(error => {
        loading = null;
        throw error;
      });

    return loading;
  }


  /*
   * The promise of the visualization of the IRI, null when no template has it.
   */
  async function visualize(iri) {
    const instance = await load();

    if(!hasTemplate(instance, iri))
      return null;

    const html = await instance.visualiseTerm(instance.dataFactory.namedNode(iri));

    // the box sets the visualization apart from the IRI (see Yasgui.scss)
    return { html: `<div class="idsm-template">${html}</div>` };
  }


  return {
    // until the templates are there, any IRI may have one; they are loaded once a cell of an IRI comes into view
    accepts: iri => renderer !== null ? hasTemplate(renderer, iri) : true,
    visualize: iris => iris.map(visualize),
  };
}


export default createTemplateVisualizer;
