import { serverBase } from "../config";
import { idn } from "../tag.js"


const corsProxy = serverBase + "/sparql/endpoint/proxy";


const defaultQuery = idn`${0}
  PREFIX sachem: <http://bioinfo.uochb.cas.cz/rdf/v1.0/sachem#>

  SELECT * WHERE {
  ?COMPOUND sachem:substructureSearch [
      sachem:query "CC(=O)Oc1ccccc1C(O)=O" ].
  }
  LIMIT 1000`


const defaultEndpoint = serverBase + "/sparql/endpoint/idsm";


const simpleCheckQuery = idn`${0}
  SELECT ?T WHERE
  {
    VALUES ?T { true }
  }`


const checkQuery = idn`${0}
  SELECT ?T WHERE
  {
    SERVICE <${serverBase}/sparql/endpoint/empty>
    {
      VALUES ?T { true }
    }
  }`


const endpoints = [{
    name: "neXtProt",
    endpoint: "https://sparql.nextprot.org/",
    query: checkQuery
  },
  {
    name: "UniProt",
    endpoint: "https://sparql.uniprot.org",
    query: checkQuery
  },
  {
    name: "Rhea",
    endpoint: "https://sparql.rhea-db.org/sparql",
    query: checkQuery
  },
  {
    name: "IDSM",
    endpoint: serverBase + "/sparql/endpoint/idsm",
    query: simpleCheckQuery
  },
  {
    name: "IDSM/Sachem: PubChem",
    endpoint: serverBase + "/sparql/endpoint/pubchem",
    query: simpleCheckQuery
  },
  {
    name: "IDSM/Sachem: ChEMBL",
    endpoint: serverBase + "/sparql/endpoint/chembl",
    query: simpleCheckQuery
  },
  {
    name: "IDSM/Sachem: ChEBI",
    endpoint: serverBase + "/sparql/endpoint/chebi",
    query: simpleCheckQuery
  },
  {
    name: "IDSM/Sachem: DrugBank",
    endpoint: serverBase + "/sparql/endpoint/drugbank",
    query: simpleCheckQuery
  },
  {
    name: "IDSM/Sachem: Wikidata",
    endpoint: serverBase + "/sparql/endpoint/wikidata",
    query: simpleCheckQuery
  },
];


export { corsProxy, defaultEndpoint, defaultQuery, endpoints };
