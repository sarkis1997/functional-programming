import {fetchData} from "./utils/fetchFunction.js";
import {herkomst} from "./utils/queries.js";

const url = "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-07/sparql";
let herkomstData;

let createD3 = function () {
	let width = 500, height = 500;

	let svg = d3.select(".chart")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(0,0)");

	let simulation = d3.forceSimulation()

	let circles = svg.selectAll(".artist")
			.data(herkomstData)
			.enter().append("circle")
			.attr("class", "artist")
			.attr("r", 10)
			.attr("fill", "lightblue")

	simulation.nodes(herkomstData)
		.on("tick", ticked)

	function ticked() {
		circles
			.attr("cx", function(d) {
				return d.x
			})
			.attr("cy", function(d) {
				return d.y
			})
	}
};

fetchData(url, herkomst)
	.then(data => {
		herkomstData = data.map(
		item => {
			let geo = item.herkomstSuperLabel.value;
			let qty = item.choCount.value;

			return {
				geo,
				qty
			};
		});
		console.log(herkomstData)
	})
	.then(createD3);