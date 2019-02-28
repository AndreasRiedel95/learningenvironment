//self.run1 – Absätze, //self.run2 – Absätze, //self.run3 – Absätze, 
const test1 = function () {
	let self = this;
	self.run1 = (htmlNode, cssString, test) => {
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
	self.run2 = (htmlNode, cssString, test) => {
		let classArray = ["paragraph1", "paragraph2", "paragraph3"];
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
	self.run3 = (htmlNode, cssString, test) => {
		console.log("This is test 3")
		return Promise.resolve()
	}
}

module.exports = test1;//self.run1 – Absätze, //self.run2 – Absätze, //self.run3 – Absätze, 