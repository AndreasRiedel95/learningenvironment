//self.absaetze_erstellen1 – Absätze erstellen,//self.absaetze_klassennamen2 – Absätze Klassennamen ,//self.absaetze_einfaerben3 – Absätze einfärben,

const test1 = function () {
	let self = this;
	self.absaetze_erstellen1 = (htmlNode, cssString, test, h, HelperInstance) => {
		let myWindow = window.open("", "", "width=600, height=500");
		test.only((
		'check if all ps are there'
		), { dom: htmlNode, styles: cssString, document: myWindow.document}, (asset) => {
			let psLength = htmlNode.querySelectorAll('p').length;
			// asset.deepEqual(
			// 	backgroundColor, 'rgb(255, 0, 0)', "Sind Sie sicher, dass Sie 3 <p> Elemente benutzt haben?"
			// );
			asset.end();
			console.log(myWindow.getComputedStyle(htmlNode.querySelector('.testi'), null).getPropertyValue('background-color'))
		});


		
		return Promise.resolve()
	}
	self.absaetze_klassennamen2 = (htmlNode, cssString, test, h, HelperInstance) => {
		self.absaetze_erstellen1(htmlNode, cssString, test, h, HelperInstance)
		let classArray = ["p1", "p2", "p3"];
		let ps = htmlNode.querySelectorAll('p');

		test((
		'check if all ps have a class'
		), { dom: htmlNode }, (asset) => {
			ps.forEach((p) => {
				asset.notEqual(
					p.classList.length, 0, "Sind Sie sicher, dass jedes <p>-Elemente eine andere Klasse besitzt?"
				);
			});
			asset.end();
		})

		test((
		'check if all ps have the right classname'
		), { dom: htmlNode }, (asset) => {
			ps.forEach((p) => {
				let className = p.className;
				let boolean = HelperInstance.checkIfInArrayContains(classArray, className)
				asset.ok(
					boolean, "Sind Sie sicher, dass die Elemente, die vorgegebenen Klassennamen haben?"
				);
			});
			asset.end();
		})

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