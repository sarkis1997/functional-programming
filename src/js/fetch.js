const newQuery = function(x, y) {
	return (x+"?query="+ encodeURIComponent(y) +"&format=json");
};

export let fetchedData = [];

export let fetchData = function(url, herkomst) {
	return fetch(newQuery(url, herkomst))
		.then(response => response.json(response))
		.then(data => {
			let dataRaw = data.results.bindings;
			dataRaw.forEach(function (item) {
				fetchedData.push(item);
			})
		})
};
