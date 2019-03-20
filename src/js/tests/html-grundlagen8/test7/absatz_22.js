//self.test28 – test2,//self.test_229 – test 22,//self.test10 – test,
const helper = require('../../../helper.js');
const HelperInstance = new helper();
const h = require('hyperscript');

const test1 = function () {
	let self = this;
	self.test28 = (htmlNode, cssString, test, h, HelperInstance) => {
		console.log("1")
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
	self.test_229 = (htmlNode, cssString, test, h, HelperInstance) => {
		self.test28(htmlNode, cssString, test, h, HelperInstance);
	let classArray = ["p1", "p2", "p3"];
		let ps = htmlNode.querySelectorAll('p');

		test((
		'check if all ps have a class'
		), { dom: htmlNode }, (asset) => {
			ps.forEach((p) => {
				asset.notEqual(
					p.classList.length, 0, "Sind Sie sicher, dass jedes <p>-Elemente eine Klasse besitzt?"
				);
			});
			asset.end();
		})

		test((
		'check if all ps have the right classname'
		), { dom: htmlNode }, (asset) => {
			ps.forEach((p) => {
				let className = p.className;
				let boolean = classArray.includes(className)
				asset.ok(
					boolean, "Sind Sie sicher, dass die Elemente, die vorgegebenen Klassennamen haben?"
				);
			});
			asset.end();
		})

		return Promise.resolve()
	}
	self.test10 = (htmlNode, cssString, test, h, HelperInstance) => {
		console.log("3")
		self.test28(htmlNode, cssString, test, h, HelperInstance);
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

module.exports = test1; 