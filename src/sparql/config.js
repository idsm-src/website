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


const builtinPrefixes = {
  rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
  rdfs: "http://www.w3.org/2000/01/rdf-schema#",
  owl: "http://www.w3.org/2002/07/owl#",
  xsd: "http://www.w3.org/2001/XMLSchema#",

  bao: "http://www.bioassayontology.org/bao#",
  bibo: "http://purl.org/ontology/bibo/",
  bioassay: "http://rdf.ncbi.nlm.nih.gov/pubchem/bioassay/",
  bp: "http://www.biopax.org/release/biopax-level3.owl#",
  cco: "http://rdf.ebi.ac.uk/terms/chembl#",
  cito: "http://purl.org/spar/cito/",
  compound: "http://rdf.ncbi.nlm.nih.gov/pubchem/compound/",
  concept: "http://rdf.ncbi.nlm.nih.gov/pubchem/concept/",
  conserveddomain: "http://rdf.ncbi.nlm.nih.gov/pubchem/conserveddomain/",
  dataset: "http://bioinfo.iocb.cz/dataset/",
  dc: "http://purl.org/dc/elements/1.1/",
  dcterms: "http://purl.org/dc/terms/",
  descriptor: "http://rdf.ncbi.nlm.nih.gov/pubchem/descriptor/",
  doi: "http://dx.doi.org/",
  ebi: "http://ebi.rdf.ac.uk/dataset/",
  endpoint: "http://rdf.ncbi.nlm.nih.gov/pubchem/endpoint/",
  ensembl: "http://rdf.ebi.ac.uk/resource/ensembl/",
  fabio: "http://purl.org/spar/fabio/",
  foaf: "http://xmlns.com/foaf/0.1/",
  freq: "http://purl.org/cld/freq/",
  fulltext: "http://bioinfo.uochb.cas.cz/rdf/v1.0/fulltext#",
  gene: "http://rdf.ncbi.nlm.nih.gov/pubchem/gene/",
  chebi: "http://purl.obolibrary.org/obo/chebi/",
  chembl_activity: "http://rdf.ebi.ac.uk/resource/chembl/activity/",
  chembl_assay: "http://rdf.ebi.ac.uk/resource/chembl/assay/",
  chembl_binding_site: "http://rdf.ebi.ac.uk/resource/chembl/binding_site/",
  chembl_bio_cmpt: "http://rdf.ebi.ac.uk/resource/chembl/biocomponent/",
  chembl_cell_line: "http://rdf.ebi.ac.uk/resource/chembl/cell_line/",
  chembl_document: "http://rdf.ebi.ac.uk/resource/chembl/document/",
  chembl: "http://rdf.ebi.ac.uk/resource/chembl/",
  chemblchembl: "http://linkedchemistry.info/chembl/chemblid/",
  chembl_indication: "http://rdf.ebi.ac.uk/resource/chembl/drug_indication/",
  chembl_journal: "http://rdf.ebi.ac.uk/resource/chembl/journal/",
  chembl_moa: "http://rdf.ebi.ac.uk/resource/chembl/drug_mechanism/",
  chembl_molecule: "http://rdf.ebi.ac.uk/resource/chembl/molecule/",
  chembl_protclass: "http://rdf.ebi.ac.uk/resource/chembl/protclass/",
  chembl_source: "http://rdf.ebi.ac.uk/resource/chembl/source/",
  chembl_target_cmpt: "http://rdf.ebi.ac.uk/resource/chembl/targetcomponent/",
  chembl_target: "http://rdf.ebi.ac.uk/resource/chembl/target/",
  cheminf: "http://semanticscience.org/resource/",
  inchikey: "http://rdf.ncbi.nlm.nih.gov/pubchem/inchikey/",
  measuregroup: "http://rdf.ncbi.nlm.nih.gov/pubchem/measuregroup/",
  mesh: "http://id.nlm.nih.gov/mesh/",
  meshv: "http://id.nlm.nih.gov/mesh/vocab#",
  mio: "http://www.ebi.ac.uk/ontology-lookup/?termId=",
  ncit: "http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#",
  ndfrt: "http://evs.nci.nih.gov/ftp1/NDF-RT/NDF-RT.owl#",
  obo: "http://purl.obolibrary.org/obo/",
  oboInOwl: "http://www.geneontology.org/formats/oboInOwl#",
  oborel: "http://purl.obolibrary.org/obo#",
  ops: "http://www.openphacts.org/units/",
  pathway: "http://rdf.ncbi.nlm.nih.gov/pubchem/pathway/",
  pav: "http://purl.org/pav/",
  pdbo: "https://rdf.wwpdb.org/schema/pdbx-v50.owl#",
  pdbo40: "http://rdf.wwpdb.org/schema/pdbx-v40.owl#",
  pdbr: "http://rdf.wwpdb.org/pdb/",
  protein: "http://rdf.ncbi.nlm.nih.gov/pubchem/protein/",
  pubchem: "http://rdf.ncbi.nlm.nih.gov/pubchem/",
  qudt: "http://qudt.org/vocab/unit#",
  reactome: "http://identifiers.org/reactome/",
  reference: "http://rdf.ncbi.nlm.nih.gov/pubchem/reference/",
  sachem: "http://bioinfo.uochb.cas.cz/rdf/v1.0/sachem#",
  sd: "http://www.w3.org/ns/sparql-service-description#",
  sio: "http://semanticscience.org/resource/",
  skos: "http://www.w3.org/2004/02/skos/core#",
  source: "http://rdf.ncbi.nlm.nih.gov/pubchem/source/",
  substance: "http://rdf.ncbi.nlm.nih.gov/pubchem/substance/",
  synonym: "http://rdf.ncbi.nlm.nih.gov/pubchem/synonym/",
  taxonomy: "http://identifiers.org/taxonomy/",
  template: "http://bioinfo.iocb.cz/0.9/template#",
  uniprot: "http://purl.uniprot.org/uniprot/",
  up: "http://purl.uniprot.org/core/",
  voag: "http://voag.linkedmodel.org/voag#",
  vocab: "http://rdf.ncbi.nlm.nih.gov/pubchem/vocabulary#",
  void: "http://rdfs.org/ns/void#",
  wikidata: "http://www.wikidata.org/entity/",
}


export { corsProxy, defaultEndpoint, defaultQuery, endpoints, builtinPrefixes };
