//self.mq_boxen_erstellen14 – MQ Boxen erstellen,//self.mq_boxen_responisve_mobile15 – MQ Boxen responisve mobile,//self.mq_boxen_responsive_tablet16 – MQ Boxen responsive tablet,//self.mq_responsive_boxen_desktop17 – MQ Responsive Boxen Desktop,
const test1 = function () {
	let self = this;
	self.mq_boxen_erstellen14 = (htmlNode, cssString, test, h, HelperInstance) => {
		test((
		'check if box1 is present'
		), { dom: htmlNode, styles: cssString}, (asset) => {
			let box1 =  htmlNode.querySelector('.box1');
			asset.equal(
				(box1 !== null) && (box1.offsetWidth > 0) && (box1.offsetHeight > 0), true, "Sind Sie sicher, dass Box 1 sichtbar ist und eine Klasse box1 besitzt?"
			);
			asset.end();
		});

		test((
		'check if box2 is present'
		), { dom: htmlNode, styles: cssString}, (asset) => {
			let box2 =  htmlNode.querySelector('.box2');
			asset.equal(
				(box2 !== null) && (box2.offsetWidth > 0) && (box2.offsetHeight > 0), true, "Sind Sie sicher, dass Box 2 sichtbar ist und eine Klasse box2 besitzt?"
			);
			asset.end();
		});

		test((
		'check if box3 is not present'
		), { dom: htmlNode, styles: cssString}, (asset) => {
			let box3 =  htmlNode.querySelector('.box3');
			asset.equal(
				(box3 !== null) && (box3.offsetWidth > 0) && (box3.offsetHeight > 0), true, "Sind Sie sicher, dass Box 3 sichtbar ist und eine Klasse box3 besitzt?"
			);
			asset.end();
		});
		return Promise.resolve()
	}

	self.mq_boxen_responisve_mobile15 = (htmlNode, cssString, test, h, HelperInstance) => {
		let doc1 = HelperInstance.createResponsiveFrame(400)
		test((
		'check if box1 is present'
		), { dom: htmlNode, styles: cssString, document: doc1}, (asset) => {
			let box1 =  htmlNode.querySelector('.box1');
			asset.equal(
				(box1.offsetWidth > 0) && (box1.offsetHeight > 0), true, "Sind Sie sicher, dass Box 1 sichtbar ist?"
			);
			asset.end();
		});

		test((
		'check if box2 is present'
		), { dom: htmlNode, styles: cssString, document: doc1}, (asset) => {
			let box2 =  htmlNode.querySelector('.box2');
			asset.equal(
				(box2.offsetWidth > 0) && (box2.offsetHeight > 0), true, "Sind Sie sicher, dass Box 2 sichtbar ist?"
			);
			asset.end();
		});

		test((
		'check if box3 is not present'
		), { dom: htmlNode, styles: cssString, document: doc1}, (asset) => {
			let box3 =  htmlNode.querySelector('.box3');
			asset.equal(
				(box3.offsetWidth > 0) && (box3.offsetHeight > 0), false, "Sind Sie sicher, dass Box 3 nicht sichtbar ist?"
			);
			asset.end();
		});

		test((
		'check if divs are underneath'
		), { dom: htmlNode, styles: cssString, document: doc1}, (asset) => {
			let box1 =  htmlNode.querySelector('.box1');
			let box2 =  htmlNode.querySelector('.box2');
			asset.equal(
				HelperInstance.positionOfElement('.box1').bottom, HelperInstance.positionOfElement('.box2').top, "Sind Sie sicher, dass die Elemente untereinander sind?"
			);
			asset.end();
		});

		return Promise.resolve()
	}

	self.mq_boxen_responsive_tablet16 = (htmlNode, cssString, test, h, HelperInstance) => {
		let doc2 = HelperInstance.createResponsiveFrame(800)
		test((
		'check if box1 is present'
		), { dom: htmlNode, styles: cssString, document: doc2}, (asset) => {
			let box1 =  htmlNode.querySelector('.box1');
			asset.equal(
				(box1 !== null) && (box1.offsetWidth > 0) && (box1.offsetHeight > 0), true, "Sind Sie sicher, dass Box 1 sichtbar ist und eine Klasse box1 besitzt?"
			);
			asset.end();
		});

		test((
		'check if box2 is present'
		), { dom: htmlNode, styles: cssString, document: doc2}, (asset) => {
			let box2 =  htmlNode.querySelector('.box2');
			asset.equal(
				(box2 !== null) && (box2.offsetWidth > 0) && (box2.offsetHeight > 0), true, "Sind Sie sicher, dass Box 2 sichtbar ist und eine Klasse box2 besitzt?"
			);
			asset.end();
		});

		test((
		'check if box3 is  present'
		), { dom: htmlNode, styles: cssString, document: doc2}, (asset) => {
			let box3 =  htmlNode.querySelector('.box3');
			asset.equal(
				(box3 !== null) && (box3.offsetWidth > 0) && (box3.offsetHeight > 0), true, "Sind Sie sicher, dass Box 3 sichtbar ist und eine Klasse box3 besitzt?"
			);
			asset.end();
		});

		test((
		'check if box1 is not as high as box2'
		), { dom: htmlNode, styles: cssString, document: doc2}, (asset) => {
			let box1 =  htmlNode.querySelector('.box1');
			let box2 =  htmlNode.querySelector('.box2');
			let array= [box1.clientHeight, box2.clientHeight]
			let boolean = HelperInstance.checkIfDuplicatesInArray(array)
			asset.equal(
				boolean, false, "Sind Sie sicher, dass box1 und box2 nicht die selbe Höhe haben?"
			);
			asset.end();
		});

		test((
		'check if box3 is not as high as box2'
		), { dom: htmlNode, styles: cssString, document: doc2}, (asset) => {
			let box3 =  htmlNode.querySelector('.box3');
			let box2 =  htmlNode.querySelector('.box2');
			let array= [box3.clientHeight, box2.clientHeight]
			let boolean = HelperInstance.checkIfDuplicatesInArray(array)
			asset.equal(
				boolean, false, "Sind Sie sicher, dass box1 und box3 nicht die selbe Höhe haben?"
			);
			asset.end();
		});

		test((
		'check if box2 is  underneath box1'
		), { dom: htmlNode, styles: cssString, document: doc2}, (asset) => {
			asset.equal(
				HelperInstance.positionOfElement('.box1').bottom, HelperInstance.positionOfElement('.box2').top, "Sind Sie sicher, dass box2 unter box 1 ist?"
			);
			asset.end();
		});

		test((
		'check if box3 is  underneath box2'
		), { dom: htmlNode, styles: cssString, document: doc2}, (asset) => {
			asset.equal(
				HelperInstance.positionOfElement('.box2').bottom, HelperInstance.positionOfElement('.box3').top, "Sind Sie sicher, dass die Elemente untereinander sind?"
			);
			asset.end();
		});

		return Promise.resolve()
	}

	self.mq_responsive_boxen_desktop17 = (htmlNode, cssString, test, h, HelperInstance) => {
		let doc3 = HelperInstance.createResponsiveFrame(801)
		test((
		'check if box1 is present'
		), { dom: htmlNode, styles: cssString, document: doc3}, (asset) => {
			let box1 =  htmlNode.querySelector('.box1');
			asset.equal(
				(box1 !== null) && (box1.offsetWidth > 0) && (box1.offsetHeight > 0), true, "Sind Sie sicher, dass Box 1 sichtbar ist und eine Klasse box1 besitzt?"
			);
			asset.end();
		});

		test((
		'check if box2 is present'
		), { dom: htmlNode, styles: cssString, document: doc3}, (asset) => {
			let box2 =  htmlNode.querySelector('.box2');
			asset.equal(
				(box2 !== null) && (box2.offsetWidth > 0) && (box2.offsetHeight > 0), true, "Sind Sie sicher, dass Box 2 sichtbar ist und eine Klasse box2 besitzt?"
			);
			asset.end();
		});

		test((
		'check if box3 is  present'
		), { dom: htmlNode, styles: cssString, document: doc3}, (asset) => {
			let box3 =  htmlNode.querySelector('.box3');
			asset.equal(
				(box3 !== null) && (box3.offsetWidth > 0) && (box3.offsetHeight > 0), true, "Sind Sie sicher, dass Box 3 sichtbar ist und eine Klasse box3 besitzt?"
			);
			asset.end();
		});

		test((
		'check if all boxes are in row'
		), { dom: htmlNode, styles: cssString, document: doc3}, (asset) => {
			let heightArray = [HelperInstance.positionOfElement('.box1').top, HelperInstance.positionOfElement('.box2').top, HelperInstance.positionOfElement('.box3').top ]
			let boolean = HelperInstance.checkIfValuesEqual(heightArray);
			asset.equal(
				boolean, true, "Sind Sie sicher, dass sich die Boxen in einer Reihe befinden?"
			);
			asset.end();
		});

		test((
		'check if all boxes are the same height'
		), { dom: htmlNode, styles: cssString, document: doc3}, (asset) => {
			let box1 =  htmlNode.querySelector('.box1');
			let box2 =  htmlNode.querySelector('.box2');
			let box3 =  htmlNode.querySelector('.box3');
			let heightArray = [box1.clientHeight, box2.clientHeight, box3.clientHeight ]
			let boolean = HelperInstance.checkIfValuesEqual(heightArray);
			asset.equal(
				boolean, true, "Sind Sie sicher, dass sich die Boxen alle die selbe Höhe haben?"
			);
			asset.end();
		});

		return Promise.resolve()
	}
}

module.exports = test1; //self.mq_boxen_erstellen14 – MQ Boxen erstellen,//self.mq_boxen_responisve_mobile15 – MQ Boxen responisve mobile,//self.mq_boxen_responsive_tablet16 – MQ Boxen responsive tablet,//self.mq_responsive_boxen_desktop17 – MQ Responsive Boxen Desktop,//self.mq_boxen_erstellen14 – MQ Boxen erstellen,//self.mq_boxen_responisve_mobile15 – MQ Boxen responisve mobile,//self.mq_boxen_responsive_tablet16 – MQ Boxen responsive tablet,//self.mq_responsive_boxen_desktop17 – MQ Responsive Boxen Desktop,