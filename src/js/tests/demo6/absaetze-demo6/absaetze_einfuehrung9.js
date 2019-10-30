//self.elemente_erstellen25 – Elemente erstellen,//self.text_einpflegen27 – Text einpflegen,//self.klasse_hinufuegen28 – Klasse hinufügen,//self.schrift_einfaerben29 – Schrift einfärben ,
const test1 = function () {
	let self = this;
	self.elemente_erstellen25 = (htmlNode, cssString, test, h, HelperInstance) => {
		let boolean = false;
		let pExp = h('p');
		let bodyExp = h('body', [pExp]);

		test((
		'check if p-Element is there'
		), { dom: htmlNode }, (asset) => {
			boolean = HelperInstance.checkIfEleExists('p');
			if(boolean) {
				let bodyUser = htmlNode.querySelector('p');
				boolean = HelperInstance.htmlDifferences(bodyExp, pExp);
				htmlNode.querySelectorAll('p').length === 1 ? boolean = true : boolean = false;
			}
			asset.ok(
				boolean, "Sind Sie sicher, dass Sie genau ein <p>-Element erstellt haben?"
			);
			asset.end();
		});

		return Promise.resolve();
	}

	self.text_einpflegen27 = (htmlNode, cssString, test, h, HelperInstance) => {
		self.elemente_erstellen25(htmlNode, cssString, test, h, HelperInstance);
		let boolean = false;
		let pExp = h('p', "Hallo Student");
		let bodyExp = h('body', [pExp]);

		test((
		'check if p-Element has correct Text'
		), { dom: htmlNode }, (asset) => {
			let bodyUser = htmlNode.querySelector('body');
			boolean = HelperInstance.htmlDifferences(bodyExp, bodyUser);
			asset.ok(
				boolean, "Sind Sie sicher, dass Sie dem <p>-Elemente den definierten Text hinzugefügt haben?"
			);
			asset.end();
		});

		return Promise.resolve();
	}

	self.klasse_hinufuegen28 = (htmlNode, cssString, test, h, HelperInstance) => {
		self.text_einpflegen27(htmlNode, cssString, test, h, HelperInstance);
		
		let boolean = false;
		
		test((
		'check if p-Element has correct class'
		), { dom: htmlNode }, (asset) => {
			let pUser = htmlNode.querySelector('p');
			pUser.classList.length === 1 && pUser.classList.contains('test-me') ? boolean = true : boolean = false;

			asset.ok(
				boolean, "Sind Sie sicher, dass Sie dem <p>-Elemente die definierte Klasse hinzugefügt haben?"
			);
			asset.end();
		});

		return Promise.resolve();
	}


	self.schrift_einfaerben29 = (htmlNode, cssString, test, h, HelperInstance) => {
		self.klasse_hinufuegen28(htmlNode, cssString, test, h, HelperInstance);

		test((
		'check if Text is red'
		), { dom: htmlNode, styles: cssString }, (asset) => {
			let pUser = htmlNode.querySelector('p');
			let colorUser = HelperInstance.getStyleProperty(pUser, 'color');
			asset.deepEqual(
				colorUser, 'rgb(255, 0, 0)', "Sind Sie sicher, dass Sie den Text rot eingefärbt haben?"
			);
			asset.end();
		});

		return Promise.resolve();
	}
}

module.exports = test1;