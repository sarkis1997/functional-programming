import { fetchData, fetchedData } from "./fetch.js";

import { herkomst, subHerkomst } from "./utils/querys.js";
const url = "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-07/sparql";

fetchData(url, herkomst);
fetchData(url, subHerkomst);

console.log(fetchedData)