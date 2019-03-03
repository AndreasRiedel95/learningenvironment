//self.run1 – Relative Positionierung, //self.run2 – Relative Positionierung, 
const test1 = function () {
	let self = this;
	self.run1 = (htmlNode, cssString, test) => {
		let boolean = false;
		test((
		'check if elements are there'
		), { dom: htmlNode }, (asset) => {
			let rahmen = htmlNode.querySelector('.rahmen')
			if( rahmen !== null){
				let image = rahmen.querySelector('img');
				let span = rahmen.querySelector('.info');
				if(image !== null && span !== null) {
					boolean = true;
					test((
					'check if picture has correct path'
					), { dom: htmlNode }, (asset) => {
						let imageSrc = htmlNode.querySelector('img').src
						console.log(imageSrc)
						asset.equal(
							imageSrc, 'http://localhost:3000/img/apfel.jpg', "Bitte überprüfen Sie den Bildpfad"
						)
						asset.end();
					});

					test((
					'check backgroundcolor rahmen'
					), { dom: htmlNode, styles: cssString }, (asset) => {
						let backgroundColorRahmen = getComputedStyle(rahmen).getPropertyValue('background-color')
						asset.equal(
							backgroundColorRahmen, 'rgb(152, 251, 152)', "Bitte überprüfen Sie die Hintergrundfarbe des Rahmens"
						)
						asset.end();
					});

					test((
					'check backgroundcolor rahmen'
					), { dom: htmlNode, styles: cssString }, (asset) => {
						let backgroundColorRahmen = getComputedStyle(span).getPropertyValue('background-color')
						asset.equal(
							backgroundColorRahmen, 'rgb(139, 0, 0)', "Bitte überprüfen Sie die Hintergrundfarbe des spans"
						)
						asset.end();
					});
				}
			}
			asset.ok(
				boolean, "Bitte überprüfen Sie ob alle Elemente da sind"
			)
			asset.end();
		});

		
		return Promise.resolve()
	}

	self.run2 = (htmlNode, cssString, test) => {
		let img = htmlNode.querySelector('img');
		img.style.display = "block"
		let rahmen = htmlNode.querySelector('.rahmen');
		let span = rahmen.querySelector('.info');
	
		test((
		'check top position of image'
		), { dom: htmlNode, styles: cssString }, (asset) => {
			console.log(img.offsetTop)
			asset.equal(
				img.offsetTop, 20, "Bitte überprüfen Sie top des Bildes"
			)
			asset.end();
		});
		test((
		'check left position of image'
		), { dom: htmlNode, styles: cssString }, (asset) => {
			console.log(span.offsetLeft)
			asset.equal(
				 span.offsetLeft, -150, "Bitte überprüfen Sie left des spans"
			)
			asset.end();
		});

		return Promise.resolve()
	}
}

module.exports = test1;