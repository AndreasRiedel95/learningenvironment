//self.run1 – Liste korrigieren, //self.run2 – Liste einfärben, //self.run3 – Aufzählungslisten, 
//self.run1 – Absätze, //self.run2 – Absätze, //self.run3 – Absätze, 
const test1 = function () {
	let self = this;
	self.run1 = (htmlNode, cssString, test) => {
		test((
		'check if list contains ol'
		), { dom: htmlNode }, (asset) => {
			let boolean;
			let ol = htmlNode.querySelector('ol');
			ol !== null ? boolean = true : boolean = false;
			asset.ok(
				boolean, "Bitte überprüfen sie ob ihre Liste eine Nummerierte ist"
			);
			asset.end();
		});

		test((
		'check if list contains 6 lis'
		), { dom: htmlNode }, (asset) => {
			let li = htmlNode.querySelectorAll('li');
			asset.equal(
				li.length, 6,  "Bitte überprüfen sie ob ihre Liste 6 Punkte beinhaltet"
			);
			asset.end();
		});
		
		return Promise.resolve()
	}
	self.run2 = (htmlNode, cssString, test) => {
		test((
		'check if ol has color aqua'
		), { dom: htmlNode, styles: cssString }, (asset) => {
			let ol = htmlNode.querySelector('ol');
			let backgroundColorOL = getComputedStyle(ol).getPropertyValue('background-color');
			asset.equal(
				backgroundColorOL, 'rgb(0, 255, 255)', "Bitte überprüfen sie ob Ihre <ol>-Liste die Hintergrundfarbe aqua besitzt"
			);
			asset.end();
		});
		test((
		'check if ol has color aqua'
		), { dom: htmlNode, styles: cssString }, (asset) => {
			let li = htmlNode.querySelectorAll('li')[0];
			let backgroundColorLI = getComputedStyle(li).getPropertyValue('background-color');
			asset.equal(
				backgroundColorLI, 'rgb(255, 99, 71)', "Bitte überprüfen sie ob Ihre <li>-Liste die Hintergrundfarbe tomato besitzt"
			);
			asset.end();
		});
		
		return Promise.resolve()
	}
	self.run3 = (htmlNode, cssString, test) => {
		test((
		'check if list contains ul'
		), { dom: htmlNode }, (asset) => {
			let boolean;
			let ul = htmlNode.querySelector('ul');
			ul !== null ? boolean = true : boolean = false;
			asset.ok(
				boolean, "Bitte überprüfen sie ob ihre Liste eine Aufzählungsliste ist"
			);
			asset.end();
		});
		
		return Promise.resolve()
	}
}

module.exports = test1;//self.run1 – Liste korrigieren, //self.run2 – Liste einfärben, //self.run3 – Aufzählungslisten, //self.run1 – Liste korrigieren, //self.run2 – Liste einfärben, //self.run3 – Aufzählungslisten, //self.run1 – Liste korrigieren, //self.run2 – Liste einfärben, //self.run3 – Aufzählungslisten, //self.run1 – Liste korrigieren, //self.run2 – Liste einfärben, //self.run3 – Aufzählungslisten, 