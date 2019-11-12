import { fetchData } from "./utils/fetchFunction.js";
import { herkomst, subHerkomst } from "./utils/queries.js";

const url = "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-07/sparql";

fetchData(url, herkomst)
	.then(data => { const newArr = data.map(
		item => {
			let geo = item.herkomstSuperLabel.value;
			let qty = item.choCount.value;
			//console.log(geo + ' - ' + qty);
			return {
				geo,
				qty
			}
		})
	});
