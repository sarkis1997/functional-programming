import {fetchData} from "./utils/fetchFunction.js";
import {herkomst} from "./utils/queries.js";

const url = "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-07/sparql";
let herkomstData;

let createD3 = function () {
	let width = 600, height = 400;

	let svg = d3.select(".chart")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" + width / 3 + ", " + height / 3 + ")");

	let radiusScale = d3.scaleSqrt().domain([1, 435694]).range([10, 80])

	let simulation = d3.forceSimulation()
		.force("x", d3.forceX(width / 2).strength(0.010))
		.force("y", d3.forceY(height / 2).strength(0.010))
		.force("collide", d3.forceCollide(function(d) {
			return radiusScale(d.qty) + 3;
		}));

	let circles = svg.selectAll(".artist")
		.data(herkomstData)
		.enter().append("circle")
		.attr("class", "artist")
		.attr("r", function(d) {
			return radiusScale(d.qty)
		})
		.attr("fill", "lightblue")
		.on("click", function(d) {
			console.log(d)
		});


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