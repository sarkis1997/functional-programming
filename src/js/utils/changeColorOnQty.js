let changeColorOnQty = function(d, el) {
	let dq = Number(d);

	if (dq <= 1000) {
		el.setAttribute('style', 'background: #c8d9ff');
	}
	else if (dq > 1000 && dq <= 10000) {
		el.setAttribute('style', 'background: #98a9ff');
	}
	else if (dq > 10000 && dq <= 100000) {
		el.setAttribute('style', 'background: #7586ff');
	}
	else if (dq > 100000 && dq <= 300000) {
		el.setAttribute('style', 'background: #003783');
	}
	else {
		el.setAttribute('style', 'background: #00076d');
	}
};

export default changeColorOnQty;