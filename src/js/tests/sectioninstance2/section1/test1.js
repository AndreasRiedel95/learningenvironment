//self.run1 – Relative Positionierung, //self.run2 – Relative Positionierung, 
const test1 = function () {
	let self = this;
	self.run1 = (htmlNode, cssString, test, h, HelperInstance) => {
		let boolean = false;
		let info = h('span.info');
		let img = h('img', {src: '/img/apfel.jpg'});
		let rahmen = h('.rahmen', [img, info]);
		test(('check if image is there '), { dom: htmlNode }, (asset) => {
			let boolean = false;
			let imgUser = htmlNode.querySelector('img');
			imgUser !== null ? boolean = HelperInstance.htmlDifferences(img, imgUser , 'strict' ) : boolean = false;
			asset.ok(
				boolean, "Überprüfen Sie den Image Path"
			)
			asset.end();
		}); 
		return Promise.resolve();
	}

	self.run2 = (htmlNode, cssString, test, h, HelperInstance) => {
		boolean = false;
		let info = h('span.info');
		let img = h('img', {src: '/img/apfel.jpg'});
		let rahmen = h('.rahmen', [img, info]);
		let boolean = false;
		test(('check if rahmen, info and image exits in right order'), {dom: htmlNode, styles: cssString}, (asset) => {
			let rahmenUser = htmlNode.querySelector('.rahmen');
			if(rahmenUser !== null) {
				HelperInstance.removeAllTextNodes(rahmenUser)
				boolean = HelperInstance.htmlDifferences(rahmen, rahmenUser);
			}
			asset.ok(boolean, "Überprüfen Sie das Markup ihrer Aufgabe");
			asset.end()
			
			if(boolean) {
				test(('check if rahmen has correct color'), {dom: htmlNode, styles: cssString}, (asset) => {
					let rahmenUser = htmlNode.querySelector('.rahmen');
					let backgroundColorRahmen = getComputedStyle(rahmenUser).getPropertyValue('background-color')
					asset.equal(
						backgroundColorRahmen, 'rgb(152, 251, 152)', "Bitte überprüfen Sie die Hintergrundfarbe des Rahmens"
					)
					asset.end();
				})

				test.onFailure(() => {
					console.log("failed")
				})
				
				test(('check if text has correct color'), {dom: htmlNode, styles: cssString}, (asset) => {
					let text = htmlNode.querySelector('.info');
					let backgroundColorText = getComputedStyle(text).getPropertyValue('background-color')
					asset.equal(
						backgroundColorText, 'rgb(139, 0, 0)', "Bitte überprüfen Sie die Hintergrundfarbe des Textes"
					)
					asset.end();
				})
			}
		})
		
		return Promise.resolve();

	}

	self.run3 = (htmlNode, cssString, test, h, HelperInstance) => {
		test(('check if image is relative'), {dom: htmlNode, styles: cssString}, (asset) => {
			
			let img = htmlNode.querySelector('img');
			let imgPos = getComputedStyle(img).getPropertyValue('position')

			console.log(imgPos)
			asset.equal(
				 imgPos, 'relative', "Bitte überprüfen Sie ob das Bild die CSS-Regel relative besitzt"
			)
			asset.end();

		});

		test(('check if image top -20'), {dom: htmlNode, styles: cssString}, (asset) => {
			let img = htmlNode.querySelector('img');
			img.style.display = "block"
			asset.equal(
				 HelperInstance.getPositionOf(img).top, -20, "Bitte überprüfen Sie ob das Bild um 20px nach oben verschoben ist"
			)
			asset.end();

		});

		test(('check if image right 50'), {dom: htmlNode, styles: cssString}, (asset) => {
			let img = htmlNode.querySelector('img');
			img.style.display = "flex"
			
			console.log("right", img.offsetLeft)

			asset.equal(
				 img.offsetLeft, 50, "Bitte überprüfen Sie ob das Bild um 50px nach oben rechts verschoben ist"
			)
			asset.end();

		});



		return Promise.resolve();


	}
}

module.exports = test1;