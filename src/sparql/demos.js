import { endpointBase } from "../config";
import { idn } from "../tag.js"


const demoQueries = [{
    name: "Substructure and similarity searching",
    queries: [{
        name: "Substructure search",
        description: "Search for structures containing aspirin as their substructure. The query structure is specified by SMILES.",
        endpoint: endpointBase + "/sparql/endpoint/chebi",
        query: idn`${0}
          PREFIX sachem: <http://bioinfo.uochb.cas.cz/rdf/v1.0/sachem#>

          SELECT * WHERE {
            ?COMPOUND sachem:substructureSearch [
                  sachem:query "CC(=O)Oc1ccccc1C(O)=O" ].
          }`
      },
      {
        name: "Substructure search by a MOL file",
        description: "Search for all alpha amino acids (in their un-ionized forms). The query structure is specified by MOL.",
        endpoint: endpointBase + "/sparql/endpoint/chebi",
        query: idn`${0}
          PREFIX sachem: <http://bioinfo.uochb.cas.cz/rdf/v1.0/sachem#>

          SELECT * WHERE {
            ?COMPOUND sachem:substructureSearch [
                sachem:query '''
          alpha amino acid

            8  7  0  0  0  0  0  0  0  0999 V2000
            233.0000  202.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
            260.7128  218.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
            205.2872  218.0000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0
            288.4256  202.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
            260.7128  250.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
            288.4256  266.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
            205.2872  250.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
            177.5744  202.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
            1  2  1  0  0  0  0
            1  3  1  0  0  0  0
            2  4  2  0  0  0  0
            2  5  1  0  0  0  0
            5  6  1  0  0  0  0
            3  7  1  0  0  0  0
            3  8  1  0  0  0  0
          M  END''' ].
          }`
      },
      {
        name: "Similarity search with score values",
        description: "Search for structures similar to ibuprofen. The query structure is specified by SMILES and the cutoff score is set as 0.8.",
        endpoint: endpointBase + "/sparql/endpoint/chebi",
        query: idn`${0}
          PREFIX sachem: <http://bioinfo.uochb.cas.cz/rdf/v1.0/sachem#>
          PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

          SELECT * WHERE {
            [ sachem:compound ?COMPOUND;
              sachem:score ?SCORE ] sachem:similaritySearch [
                    sachem:query "CC(C)Cc1ccc(cc1)C(C)C(O)=O";
                    sachem:cutoff "0.8"^^xsd:double ].
          }`
      },
      {
        name: "Simple similarity search",
        description: "A simpler variant of the previous example; the simpler syntax is especially useful in cases when the exact similarity score is irrelevant.",
        endpoint: endpointBase + "/sparql/endpoint/chebi",
        query: idn`${0}
          PREFIX sachem: <http://bioinfo.uochb.cas.cz/rdf/v1.0/sachem#>
          PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

          SELECT * WHERE {
            ?COMPOUND sachem:similarCompoundSearch [
                sachem:query "CC(C)Cc1ccc(cc1)C(C)C(O)=O";
                sachem:cutoff "0.8"^^xsd:double ].
          }`
      },
      {
        name: "Multiple substructure search",
        description: "Search for compounds that contain any of the specified substructures; in this case, we search for several penicillin-related antibiotics.",
        endpoint: endpointBase + "/sparql/endpoint/chebi",
        query: idn`${0}
          PREFIX sachem: <http://bioinfo.uochb.cas.cz/rdf/v1.0/sachem#>

          SELECT ?COMPOUND ?QUERY WHERE {
            VALUES (?QUERY ?SMILES) {
              ("clometocillin" "CC1(C(N2C(S1)C(C2=O)NC(=O)C(C3=CC(=C(C=C3)Cl)Cl)OC)C(=O)O)C")
              ("carbenicillin" "CC1(C(N2C(S1)C(C2=O)NC(=O)C(C3=CC=CC=C3)C(=O)O)C(=O)O)C")
              ("ampicillin" "CC1(C(N2C(S1)C(C2=O)NC(=O)C(C3=CC=CC=C3)N)C(=O)O)C")
            }

            ?COMPOUND sachem:substructureSearch [
                sachem:query ?SMILES ].
          }`
      }]
  },
  {
    name: "Mass spectrometry searching",
    queries: [{
        name: "Search for mass spectrum",
        description: "Search for compounds whose spectra are similar to a given mass spectrum query.",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX sio: <http://semanticscience.org/resource/>
          PREFIX ms: <http://bioinfo.uochb.cas.cz/rdf/v1.0/ms#>

          # select compounds whose spectra are similar to a given spectrum
          SELECT ?COMPOUND ?SCORE WHERE
          {
            # bind the spectrum query into variable ?MSQUERY
            BIND("""39:5 40:6 44:1 63:6 76:6 91:7 113:6
                    114:2 115:5 142:3 170:3 171:7 182:6
                    210:100 212:2"""^^ms:spectrum AS ?MSQUERY)

            # select all spectra and corresponding input compounds
            ?EXPERIMENT sio:SIO_000230 ?COMPOUND. # has input 
            ?EXPERIMENT sio:SIO_000229 ?SPECTRUM. # has output
            ?SPECTRUM sio:SIO_000300 ?MSVALUE. # has value

            # compute similarities between the spectrum query and the selected spectra
            BIND(ms:cosineHungarian(?MSQUERY, ?MSVALUE) as ?SCORE)

            # filter out results with similarity scores less than 0.85
            FILTER(?SCORE >= 0.85)
          }
          ORDER BY DESC(?SCORE)`
      },
      {
        name: "Search for mass spectra by structure",
        description: "Search for mass spectra of compounds containing aspirin as their substructure.",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX sio: <http://semanticscience.org/resource/>
          PREFIX sachem: <http://bioinfo.uochb.cas.cz/rdf/v1.0/sachem#>

          # select spectra of compounds that contain a given substructure
          SELECT ?COMPOUND ?SPECTRUM ?MSVALUE WHERE 
          {
            # search for compounds containing the substructure
            ?COMPOUND sachem:substructureSearch [
                sachem:query "CC(=O)OC1=CC=CC=C1C(=O)O";
                sachem:tautomerMode sachem:inchiTautomers ].

            # select mass spectra of the compounds found
            ?EXPERIMENT sio:SIO_000230 ?COMPOUND. # has input 
            ?EXPERIMENT sio:SIO_000229 ?SPECTRUM. # has output
            ?SPECTRUM sio:SIO_000300 ?MSVALUE. # has value
          }`
      },
      {
        name: "Search for mass spectra by bioassay results",
        description: "Search for mass spectra of compounds tested positive against target protein:ACCQ9UPY5 (cystine/glutamate transporter).",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX sio: <http://semanticscience.org/resource/>
            PREFIX bao: <http://www.bioassayontology.org/bao#>
            PREFIX obo: <http://purl.obolibrary.org/obo/>
            PREFIX protein: <http://rdf.ncbi.nlm.nih.gov/pubchem/protein/>
            PREFIX vocab: <http://rdf.ncbi.nlm.nih.gov/pubchem/vocabulary#>
            PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

            # select spectra of compounds that were tested positive against a given target
            SELECT DISTINCT ?COMPOUND ?SPECTRUM ?MSVALUE WHERE 
            {
              # select mass spectra of compounds
              ?EXPERIMENT sio:SIO_000230 ?COMPOUND. # has input 
              ?EXPERIMENT sio:SIO_000229 ?SPECTRUM. # has output
              ?SPECTRUM sio:SIO_000300 ?MSVALUE. # has value  
  
              # select pubchem equivalents of the compounds
              ?COMPOUND skos:closeMatch ?PUBCHEM_COMPOUND.

              # limit them to those that were tested positive against the target
              ?BIOASSAY bao:BAO_0000209 ?MEASUREGROUP. # has measure group
              ?MEASUREGROUP obo:RO_0000057 protein:ACCQ9UPY5. # has participant
              ?MEASUREGROUP obo:OBI_0000299 ?ENDPOINT. # has specified output
              ?ENDPOINT vocab:PubChemAssayOutcome vocab:active.
              ?ENDPOINT obo:IAO_0000136 ?SUBSTANCE. # is about
              ?SUBSTANCE sio:CHEMINF_000477 ?PUBCHEM_COMPOUND. # has normalized counterpart
            }`
      },
      {
        name: "Search mass spectra similar to by bioassay results",
        description: "Search for mass spectra that are similar to mass spectra of compounds tested positive against target protein:ACCQ9UPY5 (cystine/glutamate transporter).",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX sio: <http://semanticscience.org/resource/>
          PREFIX bao: <http://www.bioassayontology.org/bao#>
          PREFIX obo: <http://purl.obolibrary.org/obo/>
          PREFIX protein: <http://rdf.ncbi.nlm.nih.gov/pubchem/protein/>
          PREFIX vocab: <http://rdf.ncbi.nlm.nih.gov/pubchem/vocabulary#>
          PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
          PREFIX ms: <http://bioinfo.uochb.cas.cz/rdf/v1.0/ms#>

          # select spectra similar to spectra of compounds tested positive against a given target
          SELECT DISTINCT ?SPECTRUM ?MSVALUE WHERE
          {
            # select spectra of compounds that were tested positive against the target
            {
              SELECT DISTINCT ?MSQUERY WHERE
              {
                # select mass spectra of compounds
                ?EXPERIMENT sio:SIO_000229 ?SPECTRUM. # has input
                ?EXPERIMENT sio:SIO_000230 ?COMPOUND. # has output
                ?SPECTRUM sio:SIO_000300 ?MSQUERY. # has value

                # select pubchem equivalents of the compounds
                ?COMPOUND skos:closeMatch ?PUBCHEM_COMPOUND. # has value

                # limit them to those that were tested positive against the target
                ?BIOASSAY bao:BAO_0000209 ?MEASUREGROUP. # has measure group
                ?MEASUREGROUP obo:RO_0000057 protein:ACCQ9UPY5. # has participant
                ?MEASUREGROUP obo:OBI_0000299 ?ENDPOINT. # has specified output
                ?ENDPOINT vocab:PubChemAssayOutcome vocab:active.
                ?ENDPOINT obo:IAO_0000136 ?SUBSTANCE. # is about
                ?SUBSTANCE sio:CHEMINF_000477 ?PUBCHEM_COMPOUND. # has normalized counterpart
              }
            }

            # select all mass spectra
            ?SPECTRUM sio:SIO_000300 ?MSVALUE.

            # compute similarities between the spectrum queries and the selected spectra
            BIND(ms:cosineGreedy(?MSQUERY, ?MSVALUE) as ?SCORE)

            # filter out results with similarity scores less than 0.85
            FILTER(?SCORE >= 0.85)
          }`
      },
      {
        name: "Interoperability example with Rhea",
        description: "Search for mass spectra of compounds occurring in reactions which involves L-glutamate (CHEBI:29985).",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX sio: <http://semanticscience.org/resource/>
            PREFIX chebi: <http://purl.obolibrary.org/obo/chebi/>
            PREFIX sachem: <http://bioinfo.uochb.cas.cz/rdf/v1.0/sachem#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX rh: <http://rdf.rhea-db.org/>
            PREFIX CHEBI: <http://purl.obolibrary.org/obo/CHEBI_>

            # select mass spectra of compounds that occurre in reactions which involves CHEBI:29985
            SELECT ?COMPOUND ?SPECTRUM WHERE
            {
              # use Rhea to select compounds occurring in reactions in which CHEBI:29985 occurs
              SERVICE <https://sparql.rhea-db.org/sparql>
              {
                SELECT DISTINCT ?CHEBI WHERE
                {
                  ?rhea rdfs:subClassOf rh:Reaction .
                  ?rhea rh:side/rh:contains/rh:compound ?compound .
                  ?rhea rh:side/rh:contains/rh:compound ?compound1 .
                  ?compound (rh:chebi|(rh:reactivePart/rh:chebi)|(rh:underlyingChebi/rh:chebi)) CHEBI:29985.
                  ?compound1 rh:chebi ?CHEBI
                }
              }

              # select InChI descriptors of the ChEBI compounds found
              ?CHEBI chebi:inchi ?INCHI.

              # select all spectra and corresponding input compounds
              ?EXPERIMENT sio:SIO_000230 ?COMPOUND. # has input 
              ?EXPERIMENT sio:SIO_000229 ?SPECTRUM. # has output
              ?SPECTRUM sio:SIO_000300 ?MSVALUE. # has value

              # filter out compounds having the propper InChI descriptors
              ?COMPOUND sio:SIO_000008 ?DESCRIPTOR. # has attribute
              ?DESCRIPTOR rdf:type sio:CHEMINF_000113. # InChI descriptor
              ?DESCRIPTOR sio:SIO_000300 ?INCHI. # has value
            }`
      }]
  },
/*{
    name: "Interoperability examples with ChEBI",
    description: "Due to availability of official ChEBI RDF service, these examples currently use a custom mirror of ChEBI.",
    queries: [{
        name: "ChEBI interoperability",
        description: "Search for aspirin substructure, also fetching some related compound metadata (labels) from ChEBI.",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX sachem: <http://bioinfo.uochb.cas.cz/rdf/v1.0/sachem#>
          PREFIX endpoint: <${endpointBase}/sparql/endpoint/>

          SELECT * WHERE {
            SERVICE endpoint:chebi {
              ?COMPOUND sachem:substructureSearch
                  [ sachem:query "CC(=O)Oc1ccccc1C(O)=O" ]
            }
            ?COMPOUND rdfs:label ?o
          }`
      },
      {
        name: "ChEBI compounds with a specific role of substructures",
        description: "Search for ChEBI compounds containing any substructure anotated as the leprostatic drug (CHEBI:35816).",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX owl: <http://www.w3.org/2002/07/owl#>
          PREFIX obo: <http://purl.obolibrary.org/obo/>
          PREFIX chebi: <http://purl.obolibrary.org/obo/chebi/>
          PREFIX sachem: <http://bioinfo.uochb.cas.cz/rdf/v1.0/sachem#>
          PREFIX endpoint: <${endpointBase}/sparql/endpoint/>
          PREFIX sio: <http://semanticscience.org/resource/>

          SELECT DISTINCT ?COMPOUND WHERE {
            ?DRUG rdfs:subClassOf [ rdf:type owl:Restriction;
                owl:onProperty obo:RO_0000087;
                owl:someValuesFrom obo:CHEBI_35816 ].

            SERVICE endpoint:chebi {
              [ rdf:type sio:SIO_011120;
                  sio:is-attribute-of ?DRUG;
                  sio:has-value ?MOLFILE ].

              ?COMPOUND sachem:substructureSearch [
                  sachem:query ?MOLFILE ].
            }
          }`
      },
      {
        name: "ChEBI Compound properties and roles",
        description: "Display all possible roles of compounds that contain aspirin. The query uses the EBI endpoint for retrieving roles of compounds that contain aspirin, which are in turn retrieved from the IOCB endpoint.",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX sachem: <http://bioinfo.uochb.cas.cz/rdf/v1.0/sachem#>
          PREFIX endpoint: <${endpointBase}/sparql/endpoint/>
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX owl: <http://www.w3.org/2002/07/owl#>
          PREFIX obo: <http://purl.obolibrary.org/obo/>

          SELECT DISTINCT ?role ?label WHERE {
            SERVICE endpoint:chebi {
              ?COMPOUND sachem:substructureSearch
                  [ sachem:query "CC(=O)Oc1ccccc1C(O)=O" ]
            }

            ?COMPOUND rdfs:subClassOf [ rdf:type owl:Restriction ;
              owl:onProperty obo:RO_0000087 ;
              owl:someValuesFrom ?role ].
            ?role rdfs:label ?label.
          }`
      }]
  },
  {
    name: "Interoperability examples with neXtProt & UniProt",
    description: "Due to availability of official ChEMBL RDF service, these examples currently use a custom mirror of ChEMBL.",
    queries: [{
        name: "UniProt interoperability",
        description: "Search for all proteins in UniProt that have some measured activity with any compound that contains aspirin, and fetch the scientific name of the organism from which the protein originated.",
        endpoint: "https://sparql.uniprot.org",
        query: idn`${0}
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX chembl: <http://rdf.ebi.ac.uk/terms/chembl#>
          PREFIX uniprot: <http://purl.uniprot.org/core/>
          PREFIX sachem: <http://bioinfo.uochb.cas.cz/rdf/v1.0/sachem#>
          PREFIX endpoint: <${endpointBase}/sparql/endpoint/>

          SELECT ?COMPOUND ?UNIPROT ?ORGANISM_NAME WHERE
          {
              SERVICE endpoint:idsm {
                SERVICE endpoint:chembl {
                  ?COMPOUND sachem:substructureSearch [
                      sachem:query "CC(=O)Oc1ccccc1C(O)=O" ]
                }

              ?ACTIVITY rdf:type chembl:Activity;
                chembl:hasMolecule ?COMPOUND;
                chembl:hasAssay ?ASSAY.
              ?ASSAY chembl:hasTarget ?TARGET.
              ?TARGET chembl:hasTargetComponent ?COMPONENT.
              ?COMPONENT chembl:targetCmptXref ?UNIPROT.
              ?UNIPROT rdf:type chembl:UniprotRef.
            }

            ?UNIPROT uniprot:organism ?ORGANISM.
            ?ORGANISM uniprot:scientificName ?ORGANISM_NAME.
          }`
      },
      {
        name: "neXtProt interoperability",
        description: "Search for all proteins in neXtProt that have some measured activity with any compound that contains aspirin.",
        endpoint: "https://sparql.nextprot.org/",
        query: idn`${0}
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
          PREFIX chembl: <http://rdf.ebi.ac.uk/terms/chembl#>
          PREFIX sachem: <http://bioinfo.uochb.cas.cz/rdf/v1.0/sachem#>
          PREFIX endpoint: <${endpointBase}/sparql/endpoint/>
          PREFIX nextprot: <http://nextprot.org/rdf#>

          SELECT ?COMPOUND ?ENTRY WHERE
          {
            {
              SELECT ?COMPOUND ?UNIPROT WHERE {
                SERVICE endpoint:idsm {
                  SERVICE endpoint:chembl {
                    ?COMPOUND sachem:substructureSearch [
                        sachem:query "CC(=O)Oc1ccccc1C(O)=O" ]
                  }

                  ?ACTIVITY rdf:type chembl:Activity;
                    chembl:hasMolecule ?COMPOUND;
                    chembl:hasAssay ?ASSAY.
                  ?ASSAY chembl:hasTarget ?TARGET.
                  ?TARGET chembl:hasTargetComponent ?COMPONENT.
                  ?COMPONENT chembl:targetCmptXref ?UNIPROT.
                  ?UNIPROT rdf:type chembl:UniprotRef.
                }
              }
            }

            ?ENTRY skos:exactMatch ?UNIPROT.
          }`
      },
      {
        name: "neXtProt interoperability (via UniProt)",
        description: "Ask the neXtProt SPARQL endpoint to fetch aspirin-containing compounds and find UniProt proteins which have some measured activity with them, filtering the result using the UniProt class annotation to only display surface antigens.",
        endpoint: "https://sparql.nextprot.org",
        query: idn`${0}
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
          PREFIX dc: <http://purl.org/dc/elements/1.1/>
          PREFIX chembl: <http://rdf.ebi.ac.uk/terms/chembl#>
          PREFIX sachem: <http://bioinfo.uochb.cas.cz/rdf/v1.0/sachem#>
          PREFIX endpoint: <${endpointBase}/sparql/endpoint/>
          PREFIX nextprot: <http://nextprot.org/rdf#>
          PREFIX db: <http://nextprot.org/rdf/db/>

          SELECT ?COMPOUND ?ENTRY WHERE {
            SERVICE endpoint:idsm {
              SERVICE endpoint:chembl {
                ?COMPOUND sachem:substructureSearch [
                    sachem:query "CC(=O)Oc1ccccc1C(O)=O" ]
              }

              ?ACTIVITY rdf:type chembl:Activity;
                  chembl:hasMolecule ?COMPOUND;
                  chembl:hasAssay ?ASSAY.
              ?ASSAY chembl:hasTarget ?TARGET.
              ?TARGET chembl:hasTargetComponent ?COMPONENT.
              ?COMPONENT chembl:targetCmptXref ?UNIPROT.
              ?UNIPROT rdf:type chembl:UniprotRef.
              ?UNIPROT dc:identifier ?UNI.
              ?TARGET chembl:hasProteinClassification ?CLASS.
              ?CLASS chembl:classPath "/Protein class/Surface antigen".
            }

            ?ENTRY nextprot:reference [
                nextprot:provenance db:UniProt;
                nextprot:accession ?UNI ].
          }`
      },
      {
        name: "neXtProt interoperability (via PDB)",
        description: "Ask the same query as in previous example, but use PDB identifiers to link the results together.",
        endpoint: "https://sparql.nextprot.org",
        query: idn`${0}
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
          PREFIX dc: <http://purl.org/dc/elements/1.1/>
          PREFIX chembl: <http://rdf.ebi.ac.uk/terms/chembl#>
          PREFIX sachem: <http://bioinfo.uochb.cas.cz/rdf/v1.0/sachem#>
          PREFIX endpoint: <${endpointBase}/sparql/endpoint/>
          PREFIX nextprot: <http://nextprot.org/rdf#>
          PREFIX db: <http://nextprot.org/rdf/db/>

          SELECT ?COMPOUND ?ENTRY WHERE {
            SERVICE endpoint:idsm {
              SERVICE endpoint:chembl {
                ?COMPOUND sachem:substructureSearch [
                    sachem:query "CC(=O)Oc1ccccc1C(O)=O" ]
              }

              ?ACTIVITY rdf:type chembl:Activity;
                  chembl:hasMolecule ?COMPOUND;
                  chembl:hasAssay ?ASSAY.
              ?ASSAY chembl:hasTarget ?TARGET.
              ?TARGET chembl:hasTargetComponent ?COMPONENT.
              ?COMPONENT chembl:targetCmptXref ?UNIPROT.
              ?UNIPROT rdf:type chembl:ProteinDataBankRef.
              ?UNIPROT dc:identifier ?PDB.
              ?TARGET chembl:hasProteinClassification ?CLASS.
              ?CLASS chembl:classPath "/Protein class/Surface antigen".
            }

            ?ENTRY nextprot:reference [
                nextprot:provenance db:PDB;
                nextprot:accession ?PDB ].
          }`
      }]
  },
  {
    name: "Interoperability examples with Rhea & UniProt",
    queries: [{
        name: "Rhea interoperability",
        description: "Retrieve the Rhea biochemical reactions that involve cholesterol or cholesterol derivatives",
        endpoint: "https://sparql.rhea-db.org/sparql",
        query: idn`${0}
          PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#>
          PREFIX sachem: <http://bioinfo.uochb.cas.cz/rdf/v1.0/sachem#>
          PREFIX endpoint: <${endpointBase}/sparql/endpoint/>
          PREFIX up:<http://purl.uniprot.org/core/>
          PREFIX rh:<http://rdf.rhea-db.org/>
          PREFIX ch:<http://purl.obolibrary.org/obo/>

          SELECT DISTINCT ?CHEBI ?CHEBI_UNIPROT_NAME ?RHEA_REACTION ?RHEA_REACTION_EQUATION WHERE {
            SERVICE endpoint:chebi {
              ?CHEBI sachem:substructureSearch [
                  sachem:query "C1C2(C3(CCC4(C(C3(CC=C2CC(C1)O))(CCC4(C(C)CCCC(C)C)))C))C" ].
            }

            ?RHEA_REACTION rdfs:subClassOf rh:Reaction.
            ?RHEA_REACTION rh:status rh:Approved.
            ?RHEA_REACTION rh:equation ?RHEA_REACTION_EQUATION.
            ?RHEA_REACTION rh:side / rh:contains / rh:compound / rh:chebi ?CHEBI.
            ?CHEBI up:name ?CHEBI_UNIPROT_NAME.
          }`
      },
      {
        name: "Rhea+Uniprot: Enzymes",
        description: "Retrieve the number of UniProtKB/Swiss-Prot human enzymes that metabolize cholesterol or cholesterol derivatives",
        endpoint: "https://sparql.rhea-db.org/sparql",
        query: idn`${0}
          PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#>
          PREFIX sachem: <http://bioinfo.uochb.cas.cz/rdf/v1.0/sachem#>
          PREFIX endpoint: <${endpointBase}/sparql/endpoint/>
          PREFIX up:<http://purl.uniprot.org/core/>
          PREFIX rh:<http://rdf.rhea-db.org/>
          PREFIX ch:<http://purl.obolibrary.org/obo/>
          PREFIX taxon:<http://purl.uniprot.org/taxonomy/>
          PREFIX keywords:<http://purl.uniprot.org/keywords/>

          SELECT (count(distinct ?PROTEIN) AS ?HUMAN_PROTEIN_COUNT)
                 (count(distinct ?RHEA_REACTION) AS ?RHEA_REACTION_COUNT) WHERE {
            # endpoint:chebi service
            SERVICE endpoint:chebi {
                ?CHEBI sachem:substructureSearch [
                    sachem:query "C1C2(C3(CCC4(C(C3(CC=C2CC(C1)O))(CCC4(C(C)CCCC(C)C)))C))C" ].
            }

            ?RHEA_REACTION rdfs:subClassOf rh:Reaction.
            ?RHEA_REACTION rh:status rh:Approved.
            ?RHEA_REACTION rh:side / rh:contains / rh:compound / rh:chebi ?CHEBI.

            # UniProt service
            SERVICE <https://sparql.uniprot.org/sparql> {
              # Rhea reactions catalyzed by UniProt proteins
              ?PROTEIN up:annotation / up:catalyticActivity / up:catalyzedReaction ?RHEA_REACTION.

              # UniProtKB/Swiss-Prot entries
              ?PROTEIN up:reviewed true.
              # Human entries
              ?PROTEIN up:organism taxon:9606.
            }
          }`
      },
      {
        name: "Rhea+UniProt: Catalysis",
        description: "Retrieve the list of UniProtKB/Swiss-Prot human proteins that catalyze Rhea reactions involving cholesterol or cholesterol derivatives",
        endpoint: "https://sparql.rhea-db.org/sparql",
        query: idn`${0}
          PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#>
          PREFIX sachem: <http://bioinfo.uochb.cas.cz/rdf/v1.0/sachem#>
          PREFIX endpoint: <${endpointBase}/sparql/endpoint/>
          PREFIX up:<http://purl.uniprot.org/core/>
          PREFIX rh:<http://rdf.rhea-db.org/>
          PREFIX ch:<http://purl.obolibrary.org/obo/>
          PREFIX taxon:<http://purl.uniprot.org/taxonomy/>
          PREFIX keywords:<http://purl.uniprot.org/keywords/>

          SELECT distinct ?CHEBI ?CHEBI_UNIPROT_NAME ?RHEA_REACTION ?PROTEIN ?PROTEIN_FULL_NAME WHERE {
            # endpoint:chebi service
            SERVICE endpoint:chebi {
              ?CHEBI sachem:substructureSearch [
                    sachem:query "C1C2(C3(CCC4(C(C3(CC=C2CC(C1)O))(CCC4(C(C)CCCC(C)C)))C))C" ].
              }

            ?RHEA_REACTION rdfs:subClassOf rh:Reaction .
            ?RHEA_REACTION rh:status rh:Approved .
            ?RHEA_REACTION rh:side / rh:contains / rh:compound / rh:chebi ?CHEBI .
            ?CHEBI up:name ?CHEBI_UNIPROT_NAME .

            # UniProt service
            SERVICE <https://sparql.uniprot.org/sparql> {
              # Rhea reactions catalyzed by UniProt proteins
              ?PROTEIN up:annotation/up:catalyticActivity/up:catalyzedReaction ?RHEA_REACTION.

              # UniProtKB/Swiss-Prot entries
              ?PROTEIN up:reviewed true.
              # Human entries
              ?PROTEIN up:organism taxon:9606.
              # Protein name
              ?PROTEIN up:recommendedName/up:fullName ?PROTEIN_FULL_NAME.
            }
          }`
      },
      {
        name: "Rhea+UniProt: Disease-related enzymes",
        description: "Retrieve the number of UniProtKB/Swiss-Prot human enzymes that metabolize cholesterol or cholesterol derivatives and that are involved in diseases",
        endpoint: "https://sparql.rhea-db.org/sparql",
        query: idn`${0}
          PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#>
          PREFIX sachem: <http://bioinfo.uochb.cas.cz/rdf/v1.0/sachem#>
          PREFIX endpoint: <${endpointBase}/sparql/endpoint/>
          PREFIX up:<http://purl.uniprot.org/core/>
          PREFIX rh:<http://rdf.rhea-db.org/>
          PREFIX ch:<http://purl.obolibrary.org/obo/>
          PREFIX taxon:<http://purl.uniprot.org/taxonomy/>
          PREFIX keywords:<http://purl.uniprot.org/keywords/>
          PREFIX disease: <http://purl.uniprot.org/core/disease/>
          PREFIX skos:<http://www.w3.org/2004/02/skos/core#>

          SELECT (count(distinct ?PROTEIN) as ?HUMAN_PROTEIN_COUNT)
                 (count(distinct ?DISEASE) as ?DISEASE_COUNT) WHERE {
            # endpoint:chebi service
            SERVICE endpoint:chebi {
                ?CHEBI sachem:substructureSearch [
                    sachem:query "C1C2(C3(CCC4(C(C3(CC=C2CC(C1)O))(CCC4(C(C)CCCC(C)C)))C))C" ].
            }

            ?RHEA_REACTION rdfs:subClassOf rh:Reaction.
            ?RHEA_REACTION rh:status rh:Approved.
            ?RHEA_REACTION rh:side / rh:contains / rh:compound / rh:chebi ?CHEBI.

            # UniProt service
            SERVICE <https://sparql.uniprot.org/sparql> {
              # Rhea reactions catalyzed by UniProt proteins
              ?PROTEIN up:annotation/up:catalyticActivity/up:catalyzedReaction ?RHEA_REACTION.

              # UniProtKB/Swiss-Prot entries
              ?PROTEIN up:reviewed true.
              # Human entries
              ?PROTEIN up:organism taxon:9606.
              # disease
              ?PROTEIN up:annotation/up:disease ?DISEASE.
            }
          }`
      },
      {
        name: "Rhea+UniProt: Involved proteins",
        description: "Retrieve the list of diseases involving human enzymes that metabolize cholesterol or cholesterol derivatives and the number of proteins involved",
        endpoint: "https://sparql.rhea-db.org/sparql",
        query: idn`${0}
          PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#>
          PREFIX sachem: <http://bioinfo.uochb.cas.cz/rdf/v1.0/sachem#>
          PREFIX endpoint: <${endpointBase}/sparql/endpoint/>
          PREFIX up:<http://purl.uniprot.org/core/>
          PREFIX rh:<http://rdf.rhea-db.org/>
          PREFIX ch:<http://purl.obolibrary.org/obo/>
          PREFIX taxon:<http://purl.uniprot.org/taxonomy/>
          PREFIX keywords:<http://purl.uniprot.org/keywords/>
          PREFIX disease: <http://purl.uniprot.org/core/disease/>
          PREFIX skos:<http://www.w3.org/2004/02/skos/core#>

          SELECT ?DISEASE ?DISEASE_NAME (count(distinct ?PROTEIN) as ?HUMAN_PROTEIN_COUNT) WHERE {
            SERVICE endpoint:chebi {
              ?CHEBI sachem:substructureSearch [
                    sachem:query "C1C2(C3(CCC4(C(C3(CC=C2CC(C1)O))(CCC4(C(C)CCCC(C)C)))C))C" ].
              }

            ?RHEA_REACTION rdfs:subClassOf rh:Reaction.
            ?RHEA_REACTION rh:status rh:Approved.
            ?RHEA_REACTION rh:side / rh:contains / rh:compound / rh:chebi ?CHEBI .

            # UniProt endpoint service
            SERVICE <https://sparql.uniprot.org/sparql> {
              # Rhea reactions catalyzed by UniProt proteins
              ?PROTEIN up:annotation/up:catalyticActivity/up:catalyzedReaction ?RHEA_REACTION .

              # UniProtKB/Swiss-Prot entries
              ?PROTEIN up:reviewed true .
              # Human entries
              ?PROTEIN up:organism taxon:9606 .
              # disease
              ?PROTEIN up:annotation/up:disease ?DISEASE .
              ?DISEASE skos:prefLabel ?DISEASE_NAME .
            }
          }
          GROUP BY ?DISEASE ?DISEASE_NAME
          ORDER BY DESC(count(distinct ?PROTEIN))`
      },
      {
        name: "Rhea+UniProt: Interacting drugs",
        description: "Retrieve ChEMBL drugs that interact with UniProt enzymes catalyzing Rhea reactions involving members of the ChEBI class ChEBI:15889 (sterol) as participants.",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#>
          PREFIX owl: <http://www.w3.org/2002/07/owl#>
          PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
          PREFIX up: <http://purl.uniprot.org/core/>
          PREFIX rh: <http://rdf.rhea-db.org/>
          PREFIX CHEBI: <http://purl.obolibrary.org/obo/CHEBI_>
          PREFIX chebihash: <http://purl.obolibrary.org/obo/chebi#>
          PREFIX taxon:<http://purl.uniprot.org/taxonomy/>
          PREFIX cco: <http://rdf.ebi.ac.uk/terms/chembl#>
          prefix skos: <http://www.w3.org/2004/02/skos/core#>

          SELECT DISTINCT ?protein ?proteinFullName ?activityType
              ?standardActivityValue ?standardActivityUnit ?chemblMolecule ?chemlbMoleculePrefLabel WHERE {
            SERVICE <https://sparql.uniprot.org> {
              SERVICE <https://sparql.rhea-db.org/sparql> {
                # retrieve members of the ChEBI class ChEBI:15889 (sterol)
                {
                  ?chebi (rdfs:subClassOf)+ CHEBI:15889.
                } UNION {
                  _:bn (rdfs:subClassOf)+ CHEBI:15889.
                  _:bn rdfs:subClassOf [
                      a owl:Restriction;
                      owl:onProperty chebihash:has_major_microspecies_at_pH_7_3;
                      owl:someValuesFrom ?chebi ].
                }

                # retrieve the Rhea reactions involving these ChEBI as participants
                ?reaction rdfs:subClassOf rh:Reaction;
                    rh:status rh:Approved;
                    rh:side / rh:contains / rh:compound / rh:chebi ?chebi.
              }

              # retrieve the human (taxid:9606) enzymes catalyzing these Rhea reactions
              ?protein up:annotation / up:catalyticActivity / up:catalyzedReaction ?reaction;
                  up:organism taxon:9606;
                  up:recommendedName / up:fullName ?proteinFullName.
            }

            # retrieve the drugs in clinical phase 4 that interact with the enzymes
            ?activity a cco:Activity;
                cco:hasAssay / cco:hasTarget / cco:hasTargetComponent/cco:targetCmptXref ?protein;
                cco:hasMolecule ?chemblMolecule;
                cco:standardType ?activityType;
                cco:standardValue ?standardActivityValue;
                cco:standardUnits ?standardActivityUnit.

            ?chemblMolecule cco:highestDevelopmentPhase "4"^^xsd:int;
                skos:prefLabel ?chemlbMoleculePrefLabel.
          }`
      }]
    },*/
    {
      name: "PubChemRDF use cases",
      description: <>Sample queries were taken from PubChemRDF <a target="_blank" rel="noreferrer" href="https://pubchem.ncbi.nlm.nih.gov/docs/rdf-use-cases">Use Cases</a>.</>,
      queries: [{
        name: "Use case 1",
        description: "What protein targets does donepezil (CHEBI_53289) inhibit with an IC50 of 10 µM or lower?",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX obo: <http://purl.obolibrary.org/obo/>
          PREFIX sio: <http://semanticscience.org/resource/>
          PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
          PREFIX bao: <http://www.bioassayontology.org/bao#>
          PREFIX pubchem: <http://rdf.ncbi.nlm.nih.gov/pubchem/>
          PREFIX vocab: <http://rdf.ncbi.nlm.nih.gov/pubchem/vocabulary#>
          
          SELECT DISTINCT ?protein ?title ?qualifier ?value
          FROM pubchem:protein
          FROM pubchem:measuregroup
          FROM pubchem:endpoint
          FROM pubchem:substance
          WHERE {
            ?sub rdf:type obo:CHEBI_53289 ;
              obo:RO_0000056 ?mg .
            ?mg obo:RO_0000057 ?protein ;
              obo:OBI_0000299 ?ep .
            ?protein rdf:type sio:SIO_010043 ;
              skos:prefLabel ?title .
            ?ep rdf:type bao:BAO_0000190 ;
              obo:IAO_0000136 ?sub ;
              sio:SIO_000300 ?value .
            FILTER (?value < 10)
            OPTIONAL {
              ?ep vocab:hasQualifier ?qualifier .
              FILTER( ?qualifier = "=" )
            }
          }`
      },
      {
        name: "Use case 2",
        description: "What pharmacological roles of SID46505803 are defined by CHEBI?",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX owl: <http://www.w3.org/2002/07/owl#>
          PREFIX obo: <http://purl.obolibrary.org/obo/>
          PREFIX sio: <http://semanticscience.org/resource/>
          PREFIX ebi: <http://rdf.ebi.ac.uk/dataset/>
          PREFIX pubchem: <http://rdf.ncbi.nlm.nih.gov/pubchem/>
          PREFIX substance: <http://rdf.ncbi.nlm.nih.gov/pubchem/substance/>
          
          SELECT DISTINCT ?rolelabel
          FROM pubchem:substance
          FROM pubchem:compound
          FROM ebi:chebi
          WHERE {
            substance:SID46505803 sio:CHEMINF_000477 ?comp .
            ?comp rdf:type ?chebi .
            ?chebi rdfs:subClassOf [
              a owl:Restriction ;
              owl:onProperty obo:RO_0000087 ;
              owl:someValuesFrom ?role
            ] .
            ?role rdfs:label ?rolelabel .
          }`
      },
      {
        name: "Use case 3",
        description: "What compounds have a pharmacological role of NSAID as defined by CHEBI and molecular weight less than 200 g/mol?",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX owl: <http://www.w3.org/2002/07/owl#>
          PREFIX obo: <http://purl.obolibrary.org/obo/>
          PREFIX sio: <http://semanticscience.org/resource/>
          PREFIX ebi: <http://rdf.ebi.ac.uk/dataset/>
          PREFIX pubchem: <http://rdf.ncbi.nlm.nih.gov/pubchem/>
          PREFIX descriptor: <http://rdf.ncbi.nlm.nih.gov/pubchem/descriptor/>
          
          SELECT DISTINCT ?compound
          FROM pubchem:compound
          FROM descriptor:compound
          FROM ebi:chebi
          WHERE {
            ?compound rdf:type ?chebi .
            ?chebi rdfs:subClassOf [
              a owl:Restriction ;
              owl:onProperty obo:RO_0000087 ;
              owl:someValuesFrom obo:CHEBI_35475
            ] .
            ?compound sio:SIO_000008 ?MW .
            ?MW rdf:type sio:CHEMINF_000334 .
            ?MW sio:SIO_000300 ?MWValue .
            FILTER (?MWValue < 200)
          }`
      },
      {
        name: "Use case 4",
        description: "What substances have a pharmacological role of NSAID as defined by CHEBI and chemical vendor information?",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX owl: <http://www.w3.org/2002/07/owl#>
          PREFIX obo: <http://purl.obolibrary.org/obo/>
          PREFIX dcterms: <http://purl.org/dc/terms/>
          PREFIX ebi: <http://rdf.ebi.ac.uk/dataset/>
          PREFIX pubchem: <http://rdf.ncbi.nlm.nih.gov/pubchem/>
          PREFIX concept: <http://rdf.ncbi.nlm.nih.gov/pubchem/concept/>
          
          SELECT DISTINCT ?substance ?source
          FROM pubchem:substance
          FROM pubchem:source
          FROM ebi:chebi
          WHERE {
            ?substance dcterms:source ?source .
            ?source dcterms:subject concept:Chemical_Vendors .
            ?substance rdf:type ?chebi .
            ?chebi rdfs:subClassOf [
              a owl:Restriction ;
              owl:onProperty obo:RO_0000087 ;
              owl:someValuesFrom obo:CHEBI_35475
            ] .
          }`
      },
      {
        name: "Use case 5",
        description: "What protein targets are inhibited by substances with an IC50 less than 10 µM and have a pharmacological role of cholinesterase inhibitors as defined by CHEBI?",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX owl: <http://www.w3.org/2002/07/owl#>
          PREFIX obo: <http://purl.obolibrary.org/obo/>
          PREFIX sio: <http://semanticscience.org/resource/>
          PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
          PREFIX bao: <http://www.bioassayontology.org/bao#>
          PREFIX ebi: <http://rdf.ebi.ac.uk/dataset/>
          PREFIX pubchem: <http://rdf.ncbi.nlm.nih.gov/pubchem/>
          
          SELECT DISTINCT ?title
          FROM pubchem:substance
          FROM pubchem:measuregroup
          FROM pubchem:endpoint
          FROM pubchem:protein
          FROM ebi:chebi
          WHERE {
            ?chebi rdfs:subClassOf [
              a owl:Restriction ;
              owl:onProperty obo:RO_0000087 ;
              owl:someValuesFrom obo:CHEBI_37733
            ] .
            ?sub rdf:type ?chebi ;
              obo:RO_0000056 ?mg .
            ?mg obo:RO_0000057 ?protein ;
              obo:OBI_0000299 ?ep .
            ?protein rdf:type sio:SIO_010043 ;
              skos:prefLabel ?title .
            ?ep rdf:type bao:BAO_0000190 ;
              obo:IAO_0000136 ?sub ;
              sio:SIO_000300 ?value .
            FILTER (?value < 10)
          }`
      },
      {
        name: "Use case 6",
        description: "Which substances inhibit protein targets similar to ACCP00533 and have the function domain PSSMID395614?",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX obo: <http://purl.obolibrary.org/obo/>
          PREFIX sio: <http://semanticscience.org/resource/>
          PREFIX bao: <http://www.bioassayontology.org/bao#>
          PREFIX pubchem: <http://rdf.ncbi.nlm.nih.gov/pubchem/>
          PREFIX protein: <http://rdf.ncbi.nlm.nih.gov/pubchem/protein/>
          PREFIX conserveddomain: <http://rdf.ncbi.nlm.nih.gov/pubchem/conserveddomain/>
          PREFIX vocab: <http://rdf.ncbi.nlm.nih.gov/pubchem/vocabulary#>
          
          SELECT DISTINCT ?substance ?protein ?value
          FROM pubchem:substance
          FROM pubchem:measuregroup
          FROM pubchem:endpoint
          FROM pubchem:protein
          FROM pubchem:conserveddomain
          WHERE {
            ?substance obo:RO_0000056 ?measuregroup .
            ?measuregroup obo:RO_0000057 ?protein .
            protein:ACCP00533 vocab:hasSimilarProtein ?protein .
            ?protein obo:RO_0002180 conserveddomain:PSSMID395614 .
            ?measuregroup obo:OBI_0000299 ?endpoint .
            ?endpoint obo:IAO_0000136 ?substance .
            ?endpoint rdf:type bao:BAO_0000190 .
            ?endpoint sio:SIO_000300 ?value .
          }`
      },
      {
        name: "Use case 7",
        description: "What protein targets are inhibited by substances with IC50 less than 10 µM and have the same standardized chemical structure (CID3152)?",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX sio: <http://semanticscience.org/resource/>
          PREFIX obo: <http://purl.obolibrary.org/obo/>
          PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
          PREFIX bao: <http://www.bioassayontology.org/bao#>
          PREFIX pubchem: <http://rdf.ncbi.nlm.nih.gov/pubchem/>
          PREFIX compound: <http://rdf.ncbi.nlm.nih.gov/pubchem/compound/>
          
          SELECT DISTINCT ?sub ?protein ?title
          FROM pubchem:protein
          FROM pubchem:measuregroup
          FROM pubchem:endpoint
          FROM pubchem:substance
          WHERE {
            ?sub sio:CHEMINF_000477 compound:CID3152 ;
              obo:RO_0000056 ?mg .
            ?mg obo:RO_0000057 ?protein ;
              obo:OBI_0000299 ?ep .
            ?protein rdf:type sio:SIO_010043 ;
              skos:prefLabel ?title .
            ?ep rdf:type bao:BAO_0000190 ;
              obo:IAO_0000136 ?sub ;
              sio:SIO_000300 ?value .
            FILTER (?value < 10)
          }`
      },
      {
        name: "Use case 8",
        description: "What substances inhibit the proteins involved in the same biological pathway: prostaglandin biosynthetic process (GO:0001516), with an IC 50 less than 10 µM?",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX obo: <http://purl.obolibrary.org/obo/>
          PREFIX sio: <http://semanticscience.org/resource/>
          PREFIX bao: <http://www.bioassayontology.org/bao#>
          PREFIX up: <http://purl.uniprot.org/core/>
          PREFIX pubchem: <http://rdf.ncbi.nlm.nih.gov/pubchem/>
          
          SELECT DISTINCT ?substance ?protein
          FROM pubchem:substance
          FROM pubchem:measuregroup
          FROM pubchem:endpoint
          FROM pubchem:protein
          FROM pubchem:gene
          FROM pubchem:pathway
          WHERE {
            ?substance obo:RO_0000056 ?measuregroup .
            ?measuregroup obo:RO_0000057 ?protein .
            ?protein rdf:type sio:SIO_010043 .
            ?protein up:encodedBy ?gene .
            ?gene rdf:type sio:SIO_010035 .
            ?gene obo:RO_0000056 obo:GO_0001516 .
            ?measuregroup obo:OBI_0000299 ?endpoint .
            ?endpoint obo:IAO_0000136 ?substance .
            ?endpoint rdf:type bao:BAO_0000190 .
            ?endpoint sio:SIO_000300 ?value .
            FILTER (?value < 10)
          }`
      },
      {
        name: "Use case 9",
        description: "What the pharmacological roles defined by CHEBI are for the substances that inhibit protein target ACCQ12809 with an IC50 less than 10 µM?",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX owl: <http://www.w3.org/2002/07/owl#>
          PREFIX obo: <http://purl.obolibrary.org/obo/>
          PREFIX sio: <http://semanticscience.org/resource/>
          PREFIX bao: <http://www.bioassayontology.org/bao#>
          PREFIX ebi: <http://rdf.ebi.ac.uk/dataset/>
          PREFIX pubchem: <http://rdf.ncbi.nlm.nih.gov/pubchem/>
          PREFIX protein: <http://rdf.ncbi.nlm.nih.gov/pubchem/protein/>
          
          SELECT DISTINCT ?rolelabel
          FROM pubchem:measuregroup
          FROM pubchem:endpoint
          FROM pubchem:substance
          FROM ebi:chebi
          WHERE {
            ?sub obo:RO_0000056 ?mg .
            ?mg obo:RO_0000057 protein:ACCQ12809 ;
              obo:OBI_0000299 ?ep .
            ?sub rdf:type ?chebi .
            ?chebi rdfs:subClassOf [
              a owl:Restriction ;
              owl:onProperty obo:RO_0000087 ;
              owl:someValuesFrom ?role
            ] .
            ?role rdfs:label ?rolelabel .
            ?ep obo:IAO_0000136 ?sub ;
              rdf:type bao:BAO_0000190 ;
              sio:SIO_000300 ?value .
            FILTER (?value < 10)
          }`
      },
      {
        name: "Use case 10",
        description: "Summarize the statistics about the total number of substances tested in the PubChem database against each protein target.",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX sio: <http://semanticscience.org/resource/>
          PREFIX obo: <http://purl.obolibrary.org/obo/>
          PREFIX bao: <http://www.bioassayontology.org/bao#>
          PREFIX pubchem: <http://rdf.ncbi.nlm.nih.gov/pubchem/>
          
          SELECT (COUNT(?sub) AS ?subcnt) ?protein
          FROM pubchem:substance
          FROM pubchem:measuregroup
          FROM pubchem:endpoint
          FROM pubchem:protein
          WHERE {
            ?sub obo:RO_0000056 ?mg .
            ?mg obo:RO_0000057 ?protein .
            ?protein rdf:type sio:SIO_010043 .
            ?mg obo:OBI_0000299 ?ep .
            ?ep rdf:type bao:BAO_0000190 ;
              obo:IAO_0000136 ?sub ;
              sio:SIO_000300 ?value .
          }
          GROUP BY ?protein
          ORDER BY ?subcnt`
      },
      {
        name: "Use case 11",
        description: "What are the top five diseases commonly mentioned with indomethacin (CID3715)?",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX sio: <http://semanticscience.org/resource/>
          PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
          PREFIX pubchem: <http://rdf.ncbi.nlm.nih.gov/pubchem/>
          PREFIX compound: <http://rdf.ncbi.nlm.nih.gov/pubchem/compound/>
          
          SELECT ?disease ?score ?disease_prefLabel
          FROM pubchem:cooccurrence
          FROM pubchem:disease
          WHERE {
            ?cooccurrence rdf:subject compound:CID3715 .
            ?cooccurrence rdf:object ?disease .
            ?cooccurrence rdf:type sio:SIO_000993 .
            ?cooccurrence sio:SIO_000300 ?score .
            ?disease skos:prefLabel ?disease_prefLabel .
          }
          ORDER BY DESC(?score)
          LIMIT 5`
      },
      {
        name: "Use case 12",
        description: "What are the three most recent references that mention indomethacin (CID3715) and inflammation (DZID8173)?",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX prism: <http://prismstandard.org/namespaces/basic/3.0/>
          PREFIX dcterms: <http://purl.org/dc/terms/>
          PREFIX pubchem: <http://rdf.ncbi.nlm.nih.gov/pubchem/>
          PREFIX vocab: <http://rdf.ncbi.nlm.nih.gov/pubchem/vocabulary#>
          PREFIX disease: <http://rdf.ncbi.nlm.nih.gov/pubchem/disease/>
          PREFIX compound: <http://rdf.ncbi.nlm.nih.gov/pubchem/compound/>
          
          SELECT ?ref ?date ?journal ?title
          FROM pubchem:reference
          WHERE {
            ?ref vocab:discussesAsDerivedByTextMining compound:CID3715 .
            ?ref vocab:discussesAsDerivedByTextMining disease:DZID8173 .
            ?ref dcterms:date ?date .
            ?ref dcterms:title ?title .
            ?ref prism:publicationName ?journal .
          }
          ORDER BY DESC(?date)
          LIMIT 3`
      },
      {
        name: "Use case 13",
        description: "What are the top 20 genes co-mentioned with indomethacin (CID3715)?",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX sio: <http://semanticscience.org/resource/>
          PREFIX bao: <http://www.bioassayontology.org/bao#>
          PREFIX up: <http://purl.uniprot.org/core/>
          PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
          PREFIX pubchem: <http://rdf.ncbi.nlm.nih.gov/pubchem/>
          PREFIX compound: <http://rdf.ncbi.nlm.nih.gov/pubchem/compound/>
          PREFIX taxonomy: <http://rdf.ncbi.nlm.nih.gov/pubchem/taxonomy/>
          
          SELECT ?gene ?geneid ?prefLabel
          FROM pubchem:cooccurrence
          FROM pubchem:gene
          WHERE {
            ?cooccurrence rdf:subject compound:CID3715 .
            ?cooccurrence rdf:object ?gene .
            ?cooccurrence rdf:type sio:SIO_001257 .
            ?cooccurrence sio:SIO_000300 ?score .
            ?geneid bao:BAO_0002870 ?gene .
            ?geneid up:organism taxonomy:TAXID9606 .
            ?geneid skos:prefLabel ?prefLabel .
          }
          ORDER BY DESC(?score)
          LIMIT 20`
      },
      {
        name: "Use case 14",
        description: "What are the top ten diseases co-occurring with the gene most commonly mentioned with maribavir (CID471161)?",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX sio: <http://semanticscience.org/resource/>
          PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
          PREFIX pubchem: <http://rdf.ncbi.nlm.nih.gov/pubchem/>
          PREFIX compound: <http://rdf.ncbi.nlm.nih.gov/pubchem/compound/>
          
          SELECT ?gene ?disease ?disease_prefLabel
          FROM pubchem:cooccurrence
          FROM pubchem:disease
          WHERE {
            {
              SELECT ?gene
              WHERE {
                ?cooccurrence1 rdf:subject compound:CID471161 .
                ?cooccurrence1 rdf:object ?gene .
                ?cooccurrence1 rdf:type sio:SIO_001257 .
                ?cooccurrence1 sio:SIO_000300 ?score1 .
              }
              ORDER BY DESC(?score1)
              LIMIT 1
            }
            ?cooccurrence2 rdf:subject ?gene .
            ?cooccurrence2 rdf:object ?disease .
            ?cooccurrence2 rdf:type sio:SIO_000983 .
            ?cooccurrence2 sio:SIO_000300 ?score2 .
            ?disease skos:prefLabel ?disease_prefLabel .
          }
          ORDER BY DESC(?score2)
          LIMIT 10`
      },
      {
        name: "Use case 15",
        description: "What chemicals are commonly mentioned with the fibroblast growth factor receptor 1 gene (FGFR1)?",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX sio: <http://semanticscience.org/resource/>
          PREFIX pubchem: <http://rdf.ncbi.nlm.nih.gov/pubchem/>
          PREFIX gene: <http://rdf.ncbi.nlm.nih.gov/pubchem/gene/>
          
          SELECT ?compound
          FROM pubchem:cooccurrence
          FROM pubchem:gene
          WHERE {
            ?cooccurrence rdf:subject ?genesymbol .
            ?genesymbol rdf:type sio:SIO_001383 ;
              sio:SIO_000300 "fgfr1" .
            ?cooccurrence rdf:object ?compound .
            ?cooccurrence rdf:type sio:SIO_001257 .
            ?cooccurrence sio:SIO_000300 ?score .
          }`
      },
      {
        name: "Use case 16",
        description: "What chemicals are co-mentioned with a set of three genes, i.e., kinase insert domain receptor (KDR), platelet derived growth factor receptor beta (PDGFRB), and fibroblast growth factor receptor 1 (FGFR1)?",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX sio: <http://semanticscience.org/resource/>
          PREFIX pubchem: <http://rdf.ncbi.nlm.nih.gov/pubchem/>
          PREFIX gene: <http://rdf.ncbi.nlm.nih.gov/pubchem/gene/>
          
          SELECT ?score1 ?score2 ?score3 ?compound
          FROM pubchem:cooccurrence
          FROM pubchem:gene
          WHERE {
            ?cooccurrence1 rdf:subject ?genesymbol1 .
            ?genesymbol1 rdf:type sio:SIO_001383 ;
              sio:SIO_000300 "kdr" .
            ?cooccurrence1 rdf:object ?compound .
            ?cooccurrence1 rdf:type sio:SIO_001257 .
            ?cooccurrence1 sio:SIO_000300 ?score1 .
          
            ?cooccurrence2 rdf:subject ?genesymbol2 .
            ?genesymbol2 rdf:type sio:SIO_001383 ;
              sio:SIO_000300 "pdgfrb" .
            ?cooccurrence2 rdf:object ?compound .
            ?cooccurrence2 rdf:type sio:SIO_001257 .
            ?cooccurrence2 sio:SIO_000300 ?score2 .
          
            ?cooccurrence3 rdf:subject ?genesymbol3 .
            ?genesymbol3 rdf:type sio:SIO_001383 ;
              sio:SIO_000300 "fgfr1" .
            ?cooccurrence3 rdf:object ?compound .
            ?cooccurrence3 rdf:type sio:SIO_001257 .
            ?cooccurrence3 sio:SIO_000300 ?score3 .
          }
          ORDER BY DESC(?score1) DESC(?score2) DESC(?score3)`
      },
      {
        name: "Use case 17",
        description: "What are the drug-likeness properties of Aspirin (CID2244) according to Lipinski's Rule of Five?",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
          PREFIX pubchem: <http://rdf.ncbi.nlm.nih.gov/pubchem/>
          PREFIX vocab: <http://rdf.ncbi.nlm.nih.gov/pubchem/vocabulary#>
          PREFIX compound: <http://rdf.ncbi.nlm.nih.gov/pubchem/compound/>
          
          SELECT ?name ?MW ?HBD ?HBA ?LogP
          FROM pubchem:compound
          WHERE {
            compound:CID2244 skos:prefLabel ?name;
              vocab:molecular_weight ?MW ;
              vocab:hydrogen_bond_donor_count ?HBD ;
              vocab:hydrogen_bond_acceptor_count ?HBA ;
              vocab:xlogp3 ?LogP .
          }`
      }]
    },
    {
      name: "PubChemRDF federated use cases",
      description: <>Sample queries were taken from PubChemRDF <a target="_blank" rel="noreferrer" href="https://pubchem.ncbi.nlm.nih.gov/docs/rdf-federated-query">Use Cases</a>.</>,
        queries: [{
        name: "Federated use case 1",
        description: "How can I retrieve all Rhea reactions that involve L-glutamate(1-) (CID 5460299)?",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX rh: <http://rdf.rhea-db.org/>
          PREFIX pubchem: <http://rdf.ncbi.nlm.nih.gov/pubchem/>
          PREFIX compound: <http://rdf.ncbi.nlm.nih.gov/pubchem/compound/>
          
          SELECT DISTINCT ?rhea ?equation
          WHERE {
            GRAPH pubchem:compound {
              compound:CID5460299 a ?chebi .
            }
          
            SERVICE <https://sparql.rhea-db.org/sparql> {
              ?rhea rdfs:subClassOf rh:Reaction .
              ?rhea rh:equation ?equation .
              ?rhea rh:side/rh:contains/rh:compound ?compound .
          
              ?compound (rh:chebi|(rh:reactivePart/rh:chebi)|(rh:underlyingChebi/rh:chebi)) ?chebi .
            }
          }`
      },
      {
        name: "Federated use case 2",
        description: "How can I retrieve all compounds involved in the given Rhea reaction (RHEA:10020)?",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX rh: <http://rdf.rhea-db.org/>
          PREFIX pubchem: <http://rdf.ncbi.nlm.nih.gov/pubchem/>
          
          SELECT DISTINCT ?compound
          WHERE {
            SERVICE <https://sparql.rhea-db.org/sparql> {
              VALUES ?rhea { rh:10020 }
          
              ?rhea rdfs:subClassOf rh:Reaction .
              ?rhea rh:equation ?equation .
              ?rhea rh:side/rh:contains/rh:compound ?cmpd .
          
              ?cmpd (rh:chebi|(rh:reactivePart/rh:chebi)|(rh:underlyingChebi/rh:chebi)) ?chebi .
            }
          
            GRAPH pubchem:compound {
              ?compound a ?chebi .
            }
          }`
      },
      {
        name: "Federated use case 3",
        description: "How can I retrieve the WURCS sequence from Glycosmos for the glycan structure (SID 252275760) in PubChem?",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX dcterms: <http://purl.org/dc/terms/>
          PREFIX glycan: <http://purl.jp/bio/12/glyco/glycan#>
          PREFIX pubchem: <http://rdf.ncbi.nlm.nih.gov/pubchem/>
          PREFIX substance: <http://rdf.ncbi.nlm.nih.gov/pubchem/substance/>
          
          SELECT DISTINCT ?gtcid ?wurcs
          WHERE {
            GRAPH pubchem:substance {
              substance:SID252275760 rdfs:seeAlso ?glycan .
            }
          
            SERVICE <https://ts.glycosmos.org/sparql> {
              ?glycan dcterms:identifier ?gtcid ;
                glycan:has_glycosequence ?gs .
              ?gs glycan:in_carbohydrate_format glycan:carbohydrate_format_wurcs ;
                glycan:has_sequence ?wurcs .
            }
          }`
      },
      {
        name: "Federated use case 4",
        description: "Which PubChem pathways include the genes associated with Keshan disease (DOID:0050083), as identified by Glycosmos?",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX dcterms: <http://purl.org/dc/terms/>
          PREFIX glycan: <http://purl.jp/bio/12/glyco/glycan#>
          PREFIX bp3: <http://www.biopax.org/release/biopax-level3.owl#>
          PREFIX sio: <http://semanticscience.org/resource/>
          PREFIX obo: <http://purl.obolibrary.org/obo/>
          PREFIX pubchem: <http://rdf.ncbi.nlm.nih.gov/pubchem/>
          
          SELECT DISTINCT ?pathway ?title
          WHERE {
            SERVICE <https://ts.glycosmos.org/sparql> {
              VALUES ?disease { <http://glycosmos.org/disease/DOID:0050083> }
          
              ?disease a glycan:Disease ;
                sio:SIO_000255 [ sio:SIO_000001 ?glycogene ] .
            }
          
            GRAPH pubchem:gene {
              ?gene a sio:SIO_010035 ;
                rdfs:seeAlso ?glycogene .
            }
          
            GRAPH pubchem:pathway {
              ?pathway a bp3:Pathway ;
                obo:RO_0000057 ?gene ;
                dcterms:title ?title .
            }
          }`
      },
      {
        name: "Federated use case 5",
        description: "Which PDB structures with a resolution better than 2 Å that include Aspirin (CID 2244) and have associated bioactivity data in PubChem?",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX up: <http://purl.uniprot.org/core/>
          PREFIX pdbo: <http://rdf.wwpdb.org/schema/pdbx-v50.owl#>
          PREFIX cheminf: <http://semanticscience.org/resource/>
          PREFIX bao: <http://www.bioassayontology.org/bao#>
          PREFIX obo: <http://purl.obolibrary.org/obo/>
          PREFIX sio: <http://semanticscience.org/resource/>
          PREFIX pubchem: <http://rdf.ncbi.nlm.nih.gov/pubchem/>
          PREFIX compound: <http://rdf.ncbi.nlm.nih.gov/pubchem/compound/>
          
          SELECT ?structure ?resolution
          WHERE {
            GRAPH pubchem:substance {
              ?substance cheminf:CHEMINF_000477 compound:CID2244 ;
                pdbo:link_to_pdb ?structure .
            }
          
            SERVICE <https://sparql.uniprot.org/sparql/> {
              ?structure a up:Structure_Resource ;
                up:database <http://purl.uniprot.org/database/PDB> ;
                up:resolution ?resolution .
              FILTER (?resolution < 2)
          
              ?uniprot a up:Protein ;
                rdfs:seeAlso ?structure .
            }
          
            GRAPH pubchem:protein {
              ?protein a sio:SIO_010043 ;
                rdfs:seeAlso ?uniprot .
            }
          
            FILTER EXISTS {
              GRAPH pubchem:measuregroup {
                ?measuregroup a bao:BAO_0000040 ;
                  obo:RO_0000057 ?protein .
              }
            }
          }`
      },
      {
        name: "Federated use case 6",
        description: "How can I retrieve all compounds involved in PDB structures with a resolution better than 2 Å for the protein Basic phospholipase A2 VRV-PL-VIIIa (UniProt ID: P59071)?",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX up: <http://purl.uniprot.org/core/>
          PREFIX pdbo: <http://rdf.wwpdb.org/schema/pdbx-v50.owl#>
          PREFIX cheminf: <http://semanticscience.org/resource/>
          PREFIX pubchem: <http://rdf.ncbi.nlm.nih.gov/pubchem/>
          
          SELECT ?compound
          WHERE {
            SERVICE <https://sparql.uniprot.org/sparql/> {
              VALUES ?uniprot { <http://purl.uniprot.org/uniprot/P59071> }
          
              ?uniprot a up:Protein ;
                rdfs:seeAlso ?pdb .
          
              ?pdb a up:Structure_Resource ;
                up:database <http://purl.uniprot.org/database/PDB> ;
                up:resolution ?resolution .
              FILTER (?resolution < 2)
            }
          
            GRAPH pubchem:substance {
              ?substance cheminf:CHEMINF_000477 ?compound ;
                pdbo:link_to_pdb ?pdb .
            }
          }`
      },
      {
        name: "Federated use case 7",
        description: "How to retrieve the labels of Aspirin (CID 2244) in English and Spanish from Wikidata?",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX pubchem: <http://rdf.ncbi.nlm.nih.gov/pubchem/>
          PREFIX compound: <http://rdf.ncbi.nlm.nih.gov/pubchem/compound/>
          
          SELECT ?wdent ?label
          WHERE {
            GRAPH pubchem:compound {
              compound:CID2244 rdfs:seeAlso ?wdent .
            }
          
            SERVICE <https://query.wikidata.org/sparql> {
              ?wdent rdfs:label ?label .
              FILTER (LANG(?label) = "en" || LANG(?label) = "es")
            }
          }`
      },
      {
        name: "Federated use case 8",
        description: "How to retrieve the preferred label from PubChem for the Wikidata entry (Q18216)?",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX wd: <http://www.wikidata.org/entity/>
          PREFIX wdt: <http://www.wikidata.org/prop/direct/>
          PREFIX dcterms: <http://purl.org/dc/terms/>
          PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
          PREFIX pubchem: <http://rdf.ncbi.nlm.nih.gov/pubchem/>
          
          SELECT ?label
          WHERE {
            SERVICE <https://query.wikidata.org/sparql> {
              VALUES ?wdent { wd:Q18216 }
          
              ?wdent wdt:P662 ?cid .
            }
          
            GRAPH pubchem:compound {
              ?compound dcterms:identifier ?cid ;
                skos:prefLabel ?label .
            }
          }`
      },
      {
        name: "Federated use case 9",
        description: "How can I find the WikiPathways that include the compound dihydroflavine-adenine dinucleotide (CID 446013)?",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX owl: <http://www.w3.org/2002/07/owl#>
          PREFIX wp: <http://vocabularies.wikipathways.org/wp#>
          PREFIX bp3: <http://www.biopax.org/release/biopax-level3.owl#>
          PREFIX dcterms: <http://purl.org/dc/terms/>
          PREFIX obo: <http://purl.obolibrary.org/obo/>
          PREFIX pubchem: <http://rdf.ncbi.nlm.nih.gov/pubchem/>
          PREFIX compound: <http://rdf.ncbi.nlm.nih.gov/pubchem/compound/>
          
          SELECT DISTINCT ?wpid
          WHERE {
              GRAPH pubchem:pathway {
                ?pathway a bp3:Pathway ;
                  rdfs:seeAlso ?wp ;
                  obo:RO_0000057 compound:CID446013 .
                FILTER (CONTAINS(STR(?wp), 'wikipathways'))
              }
          
              BIND (IRI(REPLACE(STR(?wp), 'http://identifiers.org/wikipathways:', 'https://identifiers.org/wikipathways/')) AS ?wikipathways)
          
              SERVICE <https://sparql.wikipathways.org/sparql> {
                ?wikipathways a wp:Pathway ;
                  dcterms:identifier ?wpid .
              }
          }`
      },
      {
        name: "Federated use case 10",
        description: "How can I retrieve the CID of compounds involved in the pathway Electron Transport Chain: OXPHOS system in mitochondria (Wikipathways:WP111)?",
        endpoint: endpointBase + "/sparql/endpoint/idsm",
        query: idn`${0}
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX owl: <http://www.w3.org/2002/07/owl#>
          PREFIX wp: <http://vocabularies.wikipathways.org/wp#>
          PREFIX bp3: <http://www.biopax.org/release/biopax-level3.owl#>
          PREFIX dcterms: <http://purl.org/dc/terms/>
          PREFIX obo: <http://purl.obolibrary.org/obo/>
          PREFIX pubchem: <http://rdf.ncbi.nlm.nih.gov/pubchem/>
          
          SELECT DISTINCT ?cid
          WHERE {
              SERVICE <https://sparql.wikipathways.org/sparql> {
                ?wikipathways a wp:Pathway ;
                  dcterms:identifier "WP111" .
              }
          
              SERVICE <https://sparql.api.identifiers.org/sparql> {
                GRAPH <id:active> {
                  ?wikipathways owl:sameAs ?wp .
                }
              }
          
              GRAPH pubchem:pathway {
                ?pathway a bp3:Pathway ;
                  rdfs:seeAlso ?wp ;
                  obo:RO_0000057 ?cmpd .
              }
          
              GRAPH pubchem:compound {
                ?cmpd dcterms:identifier ?cid.
              }
          }`
      }]
    }
];


export { demoQueries };
