//self.positionierung_demo30 – Positionierung_Demo,
const test1 = function () {
	let self = this;
	self.positionierung_demo30 = (htmlNode, cssString, test, h, HelperInstance) => {
		const positionOf = (element) => {
			const {top, right, bottom, left} = element.getBoundingClientRect();
			return {top: Math.round(top), right: Math.round(right), bottom: Math.round(bottom), left: Math.round(left)};
		};

		test(('`.parent` takes up the whole width and height of its container'), 
			{ dom: htmlNode, styles: cssString }, (asset) => {
				asset.deepEqual(
					positionOf(htmlNode.querySelector('.parent')),
					positionOf(htmlNode.querySelector('.container')), 
					"Sind Sie sicher, dass das Parent-Element den Container ausfüllt?"
				);
				asset.end();
			});

		test(('`.child` is centered horizontally within its `.parent`'), 
			{ dom: htmlNode, styles: cssString }, (asset) => {
				console.log(positionOf(htmlNode.querySelector('.parent')).right - positionOf(htmlNode.querySelector('.child')).right)
				console.log(positionOf(htmlNode.querySelector('.child')).left - positionOf(htmlNode.querySelector('.parent')).left)
				asset.equal(
					positionOf(htmlNode.querySelector('.parent')).right - positionOf(htmlNode.querySelector('.child')).right,
					positionOf(htmlNode.querySelector('.child')).left - positionOf(htmlNode.querySelector('.parent')).left,
					"Sind Sie sicher, dass das Child-Element horizontal zentriert ist?"
				);
				asset.end();
			});

		test(('`.child` grows and shrink to fit its contents'), 
			{ dom: htmlNode, styles: cssString }, (asset) => {
				asset.deepEqual(
					positionOf(htmlNode.querySelector('.child')),
					positionOf(htmlNode.querySelector('.contents')),
					"Sind Sie sicher, dass das Child-Element mit dem Content shrinkt?"
				);
				asset.end();
		});

		test(('`.child` is centered vertically within its `.parent`'), 
			{ dom: htmlNode, styles: cssString }, (asset) => {
				asset.equal(
					positionOf(htmlNode.querySelector('.parent')).bottom - positionOf(htmlNode.querySelector('.child')).bottom,
					positionOf(htmlNode.querySelector('.child')).top - positionOf(htmlNode.querySelector('.parent')).top,
					"Sind Sie sicher, dass das Child-Element vertikal zentriert ist?"
				);
				asset.end();
			});

	return Promise.resolve();
	}
}

module.exports = test1;