//self.absaetze_erstellen1 – Absätze erstellen,//self.absaetze_klassennamen2 – Absätze Klassennamen ,//self.absaetze_einfaerben3 – Absätze einfärben,

const test1 = function () {
	let self = this;
	self.absaetze_erstellen1 = (htmlNode, cssString, test, h, HelperInstance) => {
		let myWindow = HelperInstance.openWindow(500, 500)
		
		test((
		'check if all ps are there'
		), { dom: htmlNode, styles: cssString, document: myWindow.document}, (asset) => {
			myWindow.onload = function() {
			let backgroundColor = myWindow.getComputedStyle(htmlNode.querySelector('.testi'), null).getPropertyValue('background-color')
			let psLength = htmlNode.querySelectorAll('p').length;
			asset.deepEqual(
				backgroundColor, 'rgb(0, 0, 255)', "Muss blau sein"
			);
			asset.end();
			myWindow.close()
		 }			
		});

		
		return Promise.resolve()
	}
	self.absaetze_klassennamen2 = (htmlNode, cssString, test, h, HelperInstance) => {
		let classArray = ["p1", "p2", "p3"];
		let ps = htmlNode.querySelectorAll('p');
		let myWindow2 = HelperInstance.openWindow(200, 500)

	test((
		'check if all ps are there'
		), { dom: htmlNode, styles: cssString, document: myWindow2.document}, (asset) => {
			myWindow2.onload = function() {
			let backgroundColor = myWindow2.getComputedStyle(htmlNode.querySelector('.testi'), null).getPropertyValue('background-color')
			console.log(backgroundColor)
			let psLength = htmlNode.querySelectorAll('p').length;
			asset.deepEqual(
				backgroundColor, 'rgb(0, 0, 0)', "Muss rot sein"
			);
			asset.end();
			myWindow2.close()
		 }			
		});

		return Promise.resolve()
	}
	self.absaetze_einfaerben3 = (htmlNode, cssString, test, h, HelperInstance) => {
		self.absaetze_erstellen1(htmlNode, cssString, test, h, HelperInstance)
		let p1= htmlNode.querySelector('.paragraph1')
		test(('`p` haben verschiedene Farben'),
			{ dom: htmlNode, styles: cssString }, (asset) => {
				let ps = htmlNode.querySelectorAll('p');
				let colorsArray = [];
				for(let i = 0; i< ps.length; i++) {
					let backgroundColor = getComputedStyle(ps[i]).getPropertyValue('background-color')
					colorsArray.push(backgroundColor)
				}
				let boolean = HelperInstance.checkIfDuplicatesInArray(colorsArray)
				asset.notOk(
					boolean, "Sind Sie sicher, dass alle Klassen eine andere Farbe haben?"
				);
		  		asset.end();
			});
		return Promise.resolve()
	}
}

module.exports = test1; //self.absaetze_erstellen1 – Absätze erstellen,//self.absaetze_klassennamen2 – Absätze Klassennamen ,//self.absaetze_einfaerben3 – Absätze einfärben,