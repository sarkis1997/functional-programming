let colorPallete = ['#c74032', '#e4744f', '#fae096', '#b1d678', '#489558'];

export let changeColorOnQtySidebar = function (d, el) {
	let dq = Number(d);

	if (dq <= 1000) {
		el.setAttribute('style', 'background:' + colorPallete[0]);
	} else if (dq > 1000 && dq <= 50000) {
		el.setAttribute('style', 'background:' + colorPallete[1]);
	} else if (dq > 50000 && dq <= 100000) {
		el.setAttribute('style', 'background:' + colorPallete[2]);
	} else if (dq > 100000 && dq <= 300000) {
		el.setAttribute('style', 'background:' + colorPallete[3]);
	} else {
		el.setAttribute('style', 'background:' + colorPallete[4]);
	}
};

export let changeColorOnQtyCircle = function (d) {
	let dq = Number(d);

	if (dq <= 1000) {
		return colorPallete[0]
	} else if (dq > 1000 && dq <= 50000) {
		return colorPallete[1]
	} else if (dq > 50000 && dq <= 100000) {
		return colorPallete[2]
	} else if (dq > 100000 && dq <= 300000) {
		return colorPallete[3]
	} else {
		return colorPallete[4]
	}
};