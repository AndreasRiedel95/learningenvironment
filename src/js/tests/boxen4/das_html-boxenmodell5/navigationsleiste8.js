//self.nav_liste18 – Nav Liste,//self.nav_text19 – Nav Text,//self.nav_rand20 – Nav Rand,//self.nav_css21 – Nav CSS,//self.nav_hintergrundfarben22 – Nav Hintergrundfarben,//self.nav_display_eigenschaft23 – Nav Display Eigenschaft,//self.nav_border_radius24 – Nav Border Radius,
const test1 = function () {
	let self = this;
	self.nav_liste18 = (htmlNode, cssString, test, h, HelperInstance) => {
		let liEle1 = h('li');
		let liEle2 = h('li');
		let liEle3 = h('li');
		let liEle4 = h('li');
		let ulEle = h('ul', [liEle1, liEle2, liEle3, liEle4]);

		test(('check if eles are there '), { dom: htmlNode }, (asset) => {
			let boolean = false;
			let ulUser = htmlNode.querySelector('ul');
			if(ulUser !== null) {
				HelperInstance.removeAllTextNodes(ulUser)
				boolean = HelperInstance.htmlDifferences(ulEle, ulUser, 'strict');
			}
			asset.ok(
				boolean, "Überprüfen Sie ob sie eine ul-Liste mit 4 Listeneinträgen haben"
			)
			asset.end();
		});
		return Promise.resolve();
	}

	self.nav_text19 = (htmlNode, cssString, test, h, HelperInstance) => {
		//Check if Elements are still there
		let doc1 = HelperInstance.createResponsiveFrame(1000)
		self.nav_liste18(htmlNode, cssString, test, h, HelperInstance)
		test(('check if lis has padding from 10px'), {dom: htmlNode, styles: cssString, document: doc1}, (asset) => {
			let lis = htmlNode.querySelectorAll('li')
			lis.forEach((li) => {
				const textNode = li.firstChild;
				const range = document.createRange();
				range.selectNode(textNode);
				const co = range.getBoundingClientRect();
				const coLi = li.getBoundingClientRect();
				let leftDiff = co.x - coLi.x
				let topDiff = co.top - coLi.top
				let bottomDiff = co.y - coLi.y
				let rightDiff = Math.round(co.width - coLi.width)
				console.log(rightDiff)
				let boolean = false;
				if(leftDiff === 10 && topDiff === 10 && bottomDiff === 10 && rightDiff === -20) {
					boolean = true;
				}
				asset.ok(boolean, "Sind Sie sicher, dass Sie ein Einrückung von 10px von Links haben?" )

			})
			asset.end();
		})
		return Promise.resolve();
	}

	self.nav_css21 = (htmlNode, cssString, test, h, HelperInstance) => {
		let linkRef = htmlNode.querySelector('link').getAttribute('href'); 
		let boolean = false;
		if((linkRef !== null) && (linkRef = './style.css') || (linkRef = 'style.css')) {
			boolean = true 
		}    
		test(('check if link is correct '), {dom: htmlNode, styles: cssString}, (asset) => {
			asset.ok(boolean, "Bitte überprüfen Sie den ihren Stylesheet-Link")
			asset.end()
		});

		return Promise.resolve();
	}
	self.nav_hintergrundfarben22 = (htmlNode, cssString, test, h, HelperInstance) => {
		//Check if Elements are still there
		self.nav_liste18(htmlNode, cssString, test, h, HelperInstance)
		test(('check if ul has background-color '), {dom: htmlNode, styles: cssString}, (asset) => {
			let backgroundColorUl = HelperInstance.getStyleProperty('ul', 'background-color')
			let booleanUl = false; 
			console.log(backgroundColorUl)
			backgroundColorUl !== "rgba(0, 0, 0, 0)" ? booleanUl = true : booleanUl = false;
			asset.ok(booleanUl, "Bitte überprüfen ob ihre ul-List eine Hintergrundfarbe besitzt")
			asset.end()
		});

		test(('check if li has background-color '), {dom: htmlNode, styles: cssString}, (asset) => {
			let lis = htmlNode.querySelectorAll('li');
			lis.forEach((li) => {
				let booleanLi = false; 
				let backgroundColorLi = HelperInstance.getStyleProperty('li', 'background-color')
				backgroundColorLi !== "rgba(0, 0, 0, 0)" ? booleanLi = true : booleanLi = false;
				asset.ok(booleanLi, "Bitte überprüfen Sie ob alle Ihre Unterpunkte eine Hinetrgrundfarbe besitzen.")
			})
			asset.end()

		});
		return Promise.resolve();
	}

	self.nav_display_eigenschaft23 = (htmlNode, cssString, test, h, HelperInstance) => {
		//Check if Elements are still there
		self.nav_liste18(htmlNode, cssString, test, h, HelperInstance)
		test((`check if elements are in one line `), {dom: htmlNode, styles: cssString}, (asset) => {
			let lis = htmlNode.querySelectorAll('li')
			for(let i = 0; i < lis.length; i++) {
				asset.equal(HelperInstance.getPositionOfElementWindow(lis[0]).top, HelperInstance.getPositionOfElementWindow(lis[i]).top, "Bitte stellen Sie sicher, dass alle li-Elemente nebeneinander stehen") 
			}
			asset.end()
		})
		return Promise.resolve();
	}

	self.nav_rand20 = (htmlNode, cssString, test, h, HelperInstance) => {
		//Check if Elements are still there
		self.nav_liste18(htmlNode, cssString, test, h, HelperInstance)
		test(('check if lis has margin-right from 5px'), {dom: htmlNode, styles: cssString}, (asset) => {
			let lis = htmlNode.querySelectorAll('li')
			lis.forEach((li) => {
				let mr = HelperInstance.getStyleProperty(li, 'margin-right');
				asset.equal(mr, '5px', "Bitte stellen Sie sicher, dass ihre li-Elemente ein margin auf der rechten Seite von 5px haben")
			})
		})

		test(('check if lis has margin-left from 5px'), {dom: htmlNode, styles: cssString}, (asset) => {
			let lis = htmlNode.querySelectorAll('li')
			lis.forEach((li) => {
				let ml = HelperInstance.getStyleProperty(li, 'margin-left');
				asset.equal(ml, '5px', "Bitte stellen Sie sicher, dass ihre li-Elemente ein margin auf der linken Seite von 5px haben")
			})
		})
		return Promise.resolve();
	}

	self.nav_border_radius24 = (htmlNode, cssString, test, h, HelperInstance) => {
		//Check if Elements are still there
		self.nav_liste18(htmlNode, cssString, test, h, HelperInstance)
		test(('check if lis has border-radius from 5px'), {dom: htmlNode, styles: cssString}, (asset) => {
			let lis = htmlNode.querySelectorAll('li')
			lis.forEach((li) => {
				let br = HelperInstance.getStyleProperty(li, 'border-radius');
				asset.equal(br, '5px', "Bitte stellen Sie sicher, dass jedes Listenelement einen border-raduius von 5px hat")
			})
			asset.end();
		})
		return Promise.resolve();
	}
}

module.exports = test1;