import {urlQuery} from "./utils/querys/herkomst";

const url = "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-07/sparql";

const query = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX edm: <http://www.europeana.eu/schemas/edm/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?herkomst ?herkomstLabel ?herkomstLabelSub ?herkomstLabelSubSub ?herkomstLabelSubSubSub ?herkomstLabelSubSubSubSub WHERE {
  <https://hdl.handle.net/20.500.11840/termmaster2> skos:narrower ?herkomst .
  ?herkomst skos:prefLabel ?herkomstLabel .
  ?herkomst skos:narrower ?herkomstSub .
  ?herkomstSub skos:prefLabel ?herkomstLabelSub .
  ?herkomstSub skos:narrower ?herkomstSubSub .
  ?herkomstSubSub skos:prefLabel ?herkomstLabelSubSub .
  ?herkomstSubSub skos:narrower ?herkomstSubSubSub .
  ?herkomstSubSubSub skos:prefLabel ?herkomstLabelSubSubSub .
  ?herkomstSubSubSub skos:narrower ?herkomstSubSubSubSub .
  ?herkomstSubSubSubSub skos:prefLabel ?herkomstLabelSubSubSubSub
}
`;

let urlQuery = url+"?query="+ encodeURIComponent(query) +"&format=json";

let dataRaw = [];

(fetchData => {
    fetch(urlQuery)
    .then(res => res.json())
    .then(json => {
        dataRaw = json;
        console.log(dataRaw)
    })
})()