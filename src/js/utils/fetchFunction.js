//this is the function that fetches the data and returns an array.
//The function can receive 2 parameters, x for the url and y for the query.

const newQuery = function(x, y) {
	return (x+"?query="+ encodeURIComponent(y) +"&format=json");
};

export let fetchData = function(url, herkomst) {
	return fetch(newQuery(url, herkomst))
		.then(response => response.json(response))
		.then(data => {
			let dataRaw = data.results.bindings;
			return dataRaw;
		})
};
