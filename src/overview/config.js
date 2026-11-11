import { endpointBase } from "../config";


// the endpoint shown when the URL names no other one
const defaultEndpoint = endpointBase + "/sparql/endpoint/idsm";


// the endpoints the left panel of the overview offers to show, besides any other one written in
const endpointChoices = [
  { name: "IDSM", url: defaultEndpoint },
  { name: "UniProt", url: "https://sparql.uniprot.org/sparql" },
  { name: "Rhea", url: "https://sparql.rhea-db.org/sparql/" },
  { name: "SwissLipids", url: "https://beta.sparql.swisslipids.org/" },
  { name: "Bgee", url: "https://www.bgee.org/sparql/" },
  { name: "Cellosaurus", url: "https://sparql.cellosaurus.org/sparql" },
  { name: "HAMAP", url: "https://hamap.expasy.org/sparql/" },
  { name: "MetaNetX", url: "https://rdf.metanetx.org/sparql/" },
  { name: "Identifiers.org", url: "https://sparql.api.identifiers.org/sparql" },
];


// the graphs of IDSM describing rather than holding data: the ontologies, MeSH and the descriptions of the endpoint
// (the VoID statistics and the examples)
const idsmOntologies = [
  "http://bioinfo.iocb.cz/dataset/ontology",
  "http://id.nlm.nih.gov/mesh/heading",
  "https://idsm.elixir-czech.cz/.well-known/*",
];


// IDSM offers sets of graphs in the filter of graphs, and shows the data at first, without the graphs above
const idsmOptions = {
  graphSets: [
    { name: "Data", except: idsmOntologies },
    { name: "PubChem", graphs: ["http://rdf.ncbi.nlm.nih.gov/pubchem/*"] },
    { name: "ChEMBL and ChEBI", graphs: ["http://rdf.ebi.ac.uk/dataset/*"] },
    {
      name: "Mass spectra (MoNA, ISDB)",
      graphs: ["https://idsm.elixir-czech.cz/rdf/mona/", "https://idsm.elixir-czech.cz/rdf/isdb/"]
    },
    { name: "MolMeDB", graphs: ["https://rdf.molmedb.upol.cz"] },
    {
      name: "Structures of other sources",
      graphs: [
        "http://wifo5-04.informatik.uni-mannheim.de/drugbank/resource/drugs/",
        "http://www.wikidata.org/entity/",
        "https://identifiers.org/pdb-ccd/",
      ]
    },
    { name: "Ontologies and metadata", graphs: idsmOntologies },
    { name: "All graphs" },
  ],
  graphSet: "Data",
};


// the options of the overview of an endpoint
function optionsFor(endpoint) {
  return endpoint === defaultEndpoint ? idsmOptions : {};
}


export { defaultEndpoint, endpointChoices, optionsFor };
