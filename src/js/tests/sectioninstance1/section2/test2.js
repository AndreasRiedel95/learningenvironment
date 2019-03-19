//self.run4 – Neu absatz 1, 
const helper = require('../../../helper.js');
const HelperInstance = new helper();
const h = require('hyperscript');

const test2 = function () {
	let self = this;
	self.run4 = (htmlNode, cssString, test, h, HelperInstance) => {
		console.log("im 2")
		test((
		'check if all ps are there'
		), { dom: htmlNode }, (asset) => {
			let psLength = htmlNode.querySelectorAll('p').length;
			asset.deepEqual(
				psLength, 3, "Sind Sie sicher, dass Sie 3 <p> Elemente benutzt haben?"
			);
			asset.end();
		});
		
		return Promise.resolve()
	}
}

module.exports = test2; 