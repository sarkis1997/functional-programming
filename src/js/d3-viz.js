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
		//add's the svg to div chart
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		//add a group within the svg
		.append("g")
		// positioning the svg
		.attr("transform", "translate(" + width / 2.5 + ", " + height / 4 + ")");

	//set the domain and range
	// the domain receives the minimum and maximum from the qtyList array which is generated in the function getQtyArr
	let radiusScale = d3.scaleSqrt().domain([d3.min(qtyList), d3.max(qtyList)]).range([5, 50])

	let simulation = d3.forceSimulation()
	//force is a imported library which simulates physical forces.
	//library: https://github.com/d3/d3-force
		.force("x", d3.forceX(width / 5).strength(0.04))
		.force("y", d3.forceY(height / 5).strength(0.005))
		.force("collide", d3.forceCollide(function(d) {
			//return the radiusScale based on the data I pass + adds some spacing
			return radiusScale(d.qty) + 3;
		}));

	let circles = svg.selectAll(".artist")
		//pass the data that will be used
		.data(herkomstData)
		//makes a circle for each object
		.enter().append("circle")
		//adds classes to each circle
		.attr("class", "artist")
		//passes the radius depending on the obj qty data I pass
		.attr("r", function(d) {
			return radiusScale(d.qty)
		})
		//each circle is being filled by the color that matches the quantity
		.attr("fill", function(d) {
			return changeColorOnQtyCircle(d.qty)
		})
		.on("click", function(d) {
			// on click adds the geoName and qty values in the sidebar
			let sidebar = document.querySelector('.sidebar');
			document.querySelector('.sidebar h1').innerHTML = "Location: " + d.geoName;
			if (d.qty <= 1) {
				document.querySelector('.sidebar h2').innerHTML = "Object: " + d.qty;
			} else {
				document.querySelector('.sidebar h2').innerHTML = "Objects: " + d.qty;
			}
			//on click -> change the sidebar color
			changeColorOnQtySidebar(d.qty, sidebar)
		});

//on state change, run function ticked
	simulation.nodes(herkomstData)
		.on("tick", ticked);

	//this functions returns the x and y of each circle so it won't overlap.
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