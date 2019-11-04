let filterHTML = (obj) => {
    // replace alles tussen < html tags > en &nbsp;
    // regex code from: https://stackoverflow.com/questions/1499889/remove-html-tags-in-javascript-with-regex
    obj.description.value = obj.description.value.replace(/(<([^>]+)>)|&nbsp;/g, ' ');
}

let url = "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-07/sparql";

const query = `
   PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
   PREFIX dc: <http://purl.org/dc/elements/1.1/>
   PREFIX dct: <http://purl.org/dc/terms/>
   PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
   PREFIX edm: <http://www.europeana.eu/schemas/edm/>
   PREFIX foaf: <http://xmlns.com/foaf/0.1/>

   SELECT ?cho ?title ?description ?objLabel ?img ?period WHERE {
     ?cho edm:isRelatedTo <https://hdl.handle.net/20.500.11840/termmaster2647> .
     ?cho dc:title ?title .
       FILTER langMatches(lang(?title), "ned")
     OPTIONAL { ?cho dc:description ?description } .
     ?cho edm:object ?obj .
       VALUES ?type { "gereedschap en uitrusting" "slavenketens" }
     ?obj skos:prefLabel ?objLabel .
     ?cho edm:isShownBy ?img .
     ?cho dct:created ?period
   }
   `

const fetchString = fetch(url+"?query="+ encodeURIComponent(query) +"&format=json");
let dataRaw = [];

(fetchData => {
    fetchString
    .then(res => res.json())
    .then(json => {
        dataRaw = json.results.bindings
        loopData()
        dataRaw.forEach(filterHTML)
    })
})()

let loopData = () => {
    dataRaw.forEach(checkDescription)
          // console.log(dataRaw)
}

let checkDescription = (obj) => {
    if (!obj.description) {
        obj.description = {
            value: "Excuses, voor dit object is er nog geen beschrijving beschikbaar"
        }
     //   console.log('geen description')
    } else {
        console.log('wel description')
    //    return
    }
}