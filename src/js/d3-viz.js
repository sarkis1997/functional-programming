import { fetchData } from "./utils/fetchFunction.js";
import { herkomst, subHerkomst } from "./utils/queries.js";
import { changeColorOnQtySidebar, changeColorOnQtyCircle } from './utils/changeColorOnQty.js';
const url = "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-07/sparql";
let herkomstData;

let createD3 = function () {

	//create new array with all qty's of objects.
	let qtyList;
	let getQtyArr = function(d) {
		qtyList = d.map(obj => {
			return qtyList = obj.qty
		})
	};
	getQtyArr(herkomstData);

	let width = 1000, height = 750;

	let svg = d3.select(".chart")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" + width / 3 + ", " + height / 3 + ")");

	let radiusScale = d3.scaleSqrt().domain([d3.min(qtyList), d3.max(qtyList)]).range([5, 50])

	let simulation = d3.forceSimulation()
		.force("x", d3.forceX(width / 2).strength(0.005))
		.force("y", d3.forceY(height / 2).strength(0.005))
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
		.attr("fill", function(d) {
			return changeColorOnQtyCircle(d.qty)
		})
		.on("click", function(d) {
			let sidebar = document.querySelector('.sidebar');
			document.querySelector('.sidebar h1').innerHTML = "Location: " + d.geoName;
			if (d.qty <= 1) {
				document.querySelector('.sidebar h2').innerHTML = "Object: " + d.qty;
			} else {
				document.querySelector('.sidebar h2').innerHTML = "Objects: " + d.qty;
			}
			changeColorOnQtySidebar(d.qty, sidebar)

		});

//on state change, run function ticked
	simulation.nodes(herkomstData)
		.on("tick", ticked);

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










//fetch data (2nd parameter is data I can pass)
fetchData(url, herkomst)
	.then(data => {
		herkomstData = data.map(
		item => {
			let geoName = item.herkomstSuperLabel.value;
			let qty = item.choCount.value;

			return {
				geoName,
				qty
			};
		});
		console.log(herkomstData)
	})
	.then(createD3);


//Special thanks to https://www.youtube.com/watch?v=lPr60pexvEM for the D3 tutorial