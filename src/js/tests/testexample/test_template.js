const test1 = function () {
	let self = this;
	self.run1 = (htmlNode, cssString, test, h, computedStyle) => {
		test((
		'`.test description message'
		), { dom: htmlNode, styles: cssString }, (asset) => {

			asset.equal(variable1, variable2, 'Fehlermeldungs String');

			asset.end();
		});

		return Promise.resolve();
   }
}

module.exports = test1;