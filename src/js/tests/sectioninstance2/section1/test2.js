//self.run2 – Überlappen Boxen, //self.run1 – Überlappen Boxen, 
const test2 = function () {
	let self = this;
	self.run1 = (htmlNode, cssString, test, h, HelperInstance) => {
		const positionOf = (element) => {
			const {top, right, bottom, left} = element.getBoundingClientRect();
			return {top, right, bottom, left};
		};
		let redBox = h('div.red-box');
		let blueBox = h('div.blue-box');
		let yellowBox = h('div.yellow-box');
		let greenBox = h('div.green-box');
		let boxWrapper = h('div.box-wrapper', [redBox, blueBox, greenBox, yellowBox]);
		let boolean = false
		test((
		'check if elements are there'
		), { dom: htmlNode }, (asset) => {
			let nodeRoute = htmlNode.querySelector('.box-wrapper');
			if(nodeRoute !== null) {
				HelperInstance.removeAllTextNodes(nodeRoute);
				boolean = HelperInstance.htmlDifferences(boxWrapper, nodeRoute );
			} 
			asset.ok(boolean, 'Bitte überprüfen Sie die Struktur und Klassennamen ihrer HTML Datei')
			asset.end();

			if(boolean) {
				test(('check if position of red and blue is correct'), {dom: htmlNode, styles: cssString}, (asset) => {
					asset.equal(
						Math.round(positionOf(htmlNode.querySelector('.red-box')).bottom),
						Math.round(positionOf(htmlNode.querySelector('.blue-box')).top),
						"Ist das grüne Rechteck direkt unter dem Blauen?"
						)
					asset.end();
				})

				test(('check if position of blue and green is correct'), {dom: htmlNode, styles: cssString}, (asset) => {
					console.log(positionOf(htmlNode.querySelector('.blue-box')).bottom)
					console.log(positionOf(htmlNode.querySelector('.green-box')).top)
					asset.equal(
						Math.round(positionOf(htmlNode.querySelector('.blue-box')).bottom),
						Math.round(positionOf(htmlNode.querySelector('.green-box')).top),
						"Ist das blaue Rechteck direkt unter dem Roten?"
						)
					asset.end();
				})

				test(('check if position of yellow and green is correct'), {dom: htmlNode, styles: cssString}, (asset) => {
					asset.equal(
						Math.round(positionOf(htmlNode.querySelector('.green-box')).bottom),
						Math.round(positionOf(htmlNode.querySelector('.yellow-box')).top),
						"Ist das gelbe Rechteck direkt unter dem Grünen?"
						)
					asset.end();
				})
			}

		})
		
		return Promise.resolve()
	}
	self.run2 = (htmlNode, cssString, test, h, HelperInstance) => {
		const positionOf = (element) => {
			const {top, right, bottom, left} = element.getBoundingClientRect();
			return {top, right, bottom, left};
		};

		let green = htmlNode.querySelector('.green-box');
		let yellow = htmlNode.querySelector('.yellow-box');
		let red = htmlNode.querySelector('.red-box');

		test(('check if position of green is correct'), {dom: htmlNode, styles: cssString}, (asset) => {
				let green = htmlNode.querySelector('.green-box');
			asset.equal(
				positionOf(green).top,
				positionOf(yellow).top,
				"Ist das grüne und gelbe Rechteck top korrekt platziert?"
			)
			asset.end();
		})
		test(('check if position of yellow is correct'), {dom: htmlNode, styles: cssString}, (asset) => {
				let yellow = htmlNode.querySelector('.yellow-box');
				console.log(positionOf(yellow).top)
			asset.equal(
				positionOf(green).left,
				positionOf(yellow).left,
				"Ist das rüne und gelbe Rechteck left korrekt platziert?"
			)
			asset.end();
		})
		test(('check if position of yellow is correct'), {dom: htmlNode, styles: cssString}, (asset) => {
				let yellow = htmlNode.querySelector('.yellow-box');
			asset.equal(
				positionOf(red).left,
				positionOf(yellow).left,
				"Ist das gelbe und rote Rechteck left korrekt platziert?"
			)
			asset.end();
		})
		test(('check if position of yellow is correct'), {dom: htmlNode, styles: cssString}, (asset) => {
				let yellow = htmlNode.querySelector('.yellow-box');
				console.log(positionOf(yellow).top)
			asset.equal(
				positionOf(red).top,
				positionOf(green).top,
				"Ist das rote und grüne Rechteck top korrekt platziert?"
			)
			asset.end();
		})
		return Promise.resolve()

	}
}

module.exports = test2;