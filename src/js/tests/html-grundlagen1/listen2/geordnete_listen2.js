//self.liste_korrigieren4 – Liste korrigieren,//self.liste_einfaerben5 – Liste einfärben,//self.aufzaehlungsliste6 – Aufzählungsliste,
const test1 = function () {
	let self = this;
	self.liste_korrigieren4 = (htmlNode, cssString, test, h, HelperInstance) => {
		test((
		'check if list contains ol'
		), { dom: htmlNode }, (asset) => {
			let boolean = HelperInstance.checkIfEleExists('ol');
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
	self.liste_einfaerben5 = (htmlNode, cssString, test, h, HelperInstance) => {
		self.liste_korrigieren4(htmlNode, cssString, test, h, HelperInstance)
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
	self.aufzaehlungsliste6 = (htmlNode, cssString, test, h, HelperInstance) => {
		test((
		'check if list contains ul'
		), { dom: htmlNode }, (asset) => {
			let boolean;
			let ul = htmlNode.querySelectorAll('ul');
			ul.length === 6 ? boolean = true : boolean = false;
			asset.ok(
				boolean, "Bitte überprüfen sie ob ihre Liste eine Aufzählungsliste ist"
			);
			asset.end();
		});
		
		return Promise.resolve()
	}
}

module.exports = test1;//self.run1 – Liste korrigieren, //self.run2 – Liste einfärben, //self.run3 – Aufzählungslisten, //self.run1 – Liste korrigieren, //self.run2 – Liste einfärben, //self.run3 – Aufzählungslisten, //self.run1 – Liste korrigieren, //self.run2 – Liste einfärben, //self.run3 – Aufzählungslisten, //self.run1 – Liste korrigieren, //self.run2 – Liste einfärben, //self.run3 – Aufzählungslisten, //self.run1 – Liste korrigieren, //self.run2 – Liste einfärben, //self.run3 – Aufzählungslisten, //self.run1 – Liste korrigieren, //self.run2 – Liste einfärben, //self.run3 – Aufzählungslisten, //self.run1 – Liste korrigieren, //self.run2 – Liste einfärben, //self.run3 – Aufzählungslisten, //self.run1 – Liste korrigieren, //self.run2 – Liste einfärben, //self.run3 – Aufzählungslisten, //self.run1 – Liste korrigieren, //self.run2 – Liste einfärben, //self.run3 – Aufzählungslisten, 