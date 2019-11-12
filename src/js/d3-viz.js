import {fetchData} from "./utils/fetchFunction.js";
import {herkomst} from "./utils/queries.js";

const url = "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-07/sparql";

let createD3 = function () {
	d3.select('body')
		.selectAll('svg')
		.data(herkomstData)
}

let herkomstData;
fetchData(url, herkomst)
	.then(data => {
		herkomstData = data.map(
		item => {
			let geo = item.herkomstSuperLabel.value;
			let qty = item.choCount.value;

			return qty
		});
	console.log(herkomstData)
	})
	.then(createD3);