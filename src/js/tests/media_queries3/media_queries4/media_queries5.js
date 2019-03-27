//self.mq_div-element_erstellen12 – MQ div-Element erstellen,//self.mq_hintergrund_einfaerben13 – MQ Hintergrund einfärben,
const test1 = function () {
	let self = this;
	self.mq_divelement_erstellen12 = (htmlNode, cssString, test, h, HelperInstance) => {
		test((
		'check if all ps are there'
		), { dom: htmlNode, styles: cssString}, (asset) => {
			asset.pass()
			console.error("Für Testzwecke passed dieser Test immer")
			asset.end();
		});
		return Promise.resolve()
	}
	self.mq_hintergrund_einfaerben13 = (htmlNode, cssString, test, h, HelperInstance) => {
		let doc1 = HelperInstance.createResponsiveFrame(501)
		let doc2 = HelperInstance.createResponsiveFrame(500)
		test((
		'check if all ps are there'
		), { dom: htmlNode, styles: cssString, document: doc1}, (asset) => {
			let backgroundColor = getComputedStyle(htmlNode.querySelector('.testi'), null).getPropertyValue('background-color')
			console.log(getComputedStyle(htmlNode.querySelector('.testi'), null).getPropertyValue('height'))
			console.log(backgroundColor)
			console.log(htmlNode.querySelector('.testi').style.backgroundColor)
			asset.deepEqual(
				backgroundColor,'rgb(0, 0, 255)', "Hintergrund muss blau sein wenn Bildschirmweite größer als 500px"
			);
			asset.end();
		});

		test((
		'check if all ps are there'
		), { dom: htmlNode, styles: cssString, document: doc2}, (asset) => {
			let backgroundColor = getComputedStyle(htmlNode.querySelector('.testi'), null).getPropertyValue('background-color')
			console.log(getComputedStyle(htmlNode.querySelector('.testi'), null).getPropertyValue('height'))
			console.log(backgroundColor)
			asset.timeoutAfter(500)
			asset.deepEqual(
				backgroundColor, 'rgb(255, 0, 0)', "Hintergrund muss rot sein wenn Bildschirmweite kleiner als 500px"
			);
			asset.end();
			
		});
		return Promise.resolve()
	}
}

module.exports = test1; //self.mq_divelement_erstellen12 – MQ divElement erstellen,//self.mq_hintergrund_einfaerben13 – MQ Hintergrund einfärben,//self.mq_divelement_erstellen12 – MQ divElement erstellen,//self.mq_hintergrund_einfaerben13 – MQ Hintergrund einfärben,//self.mq_divelement_erstellen12 – MQ divElement erstellen,//self.mq_hintergrund_einfaerben13 – MQ Hintergrund einfärben,//self.mq_divelement_erstellen12 – MQ divElement erstellen,//self.mq_hintergrund_einfaerben13 – MQ Hintergrund einfärben,