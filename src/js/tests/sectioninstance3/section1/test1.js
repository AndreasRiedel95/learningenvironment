//self.run1 – Navigationsleiste, //self.run2 – Navigationsleiste, //self.run3 – Navigationsleiste, //self.run4 – Navigationsleiste, //self.run5 – Navigationsleiste, //self.run6 – Navigationsleiste, //self.run7 – Navigationsleiste, //self.run8 – Navigationsleiste, //self.run9 – Navigationsleiste, 
const test1 = function () {
	let self = this;
	self.run1 = (htmlNode, cssString, test, h, HelperInstance) => {
		let liEle1 = h('li');
		let liEle2 = h('li');
		let liEle3 = h('li');
		let liEle4 = h('li');
		let ulEle = h('ul', [liEle1, liEle2, liEle3, liEle4]);

		test(('check if eles are there '), { dom: htmlNode }, (asset) => {
			let boolean = false;
			let ulUser = htmlNode.querySelector('ul');
			if(ulUser !== null) {
				HelperInstance.removeAllTextNodes(ulEle)
				boolean = HelperInstance.htmlDifferences(ulEle, ulUser);
			}
			asset.ok(
				boolean, "Überprüfen Sie ob sie eine ul-Liste mit 4 Listeneinträgen haben"
			)
			asset.end();
		});
		return Promise.resolve();
	}

	self.run2 = (htmlNode, cssString, test, h, HelperInstance) => {
		//Check if Elements are still there
		self.run1(htmlNode, cssString, test, h, HelperInstance)
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
	self.run3 = (htmlNode, cssString, test, h, HelperInstance) => {
		//Check if Elements are still there
		self.run1(htmlNode, cssString, test, h, HelperInstance)
		test(('check if ul has background-color '), {dom: htmlNode, styles: cssString}, (asset) => {
			let ul = htmlNode.querySelector('ul');
			let backgroundColorUl = getComputedStyle(ul).getPropertyValue('background-color');
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
				let backgroundColorLi = getComputedStyle(li).getPropertyValue('background-color');	
				backgroundColorLi !== "rgba(0, 0, 0, 0)" ? booleanLi = true : booleanLi = false;
				asset.ok(booleanLi, "Bitte überprüfen Sie ob alle Ihre Unterpunkte eine Hinetrgrundfarbe besitzen.")
			})
			asset.end()

		});
		return Promise.resolve();
	}

	self.run4 = (htmlNode, cssString, test, h, HelperInstance) => {
		//Check if Elements are still there
		self.run1(htmlNode, cssString, test, h, HelperInstance)
		test((`check if elements are in one line `), {dom: htmlNode, styles: cssString}, (asset) => {
			let lis = htmlNode.querySelectorAll('li')
			for(let i = 0; i < lis.length; i++) {
				asset.equal(HelperInstance.getPositionOf(lis[0]).top, HelperInstance.getPositionOf(lis[i]).top, "Bitte stellen Sie sicher, dass alle li-Elemente nebeneinander stehen") 
			}
			asset.end()
		})
		return Promise.resolve();
	}

	self.run5 = (htmlNode, cssString, test, h, HelperInstance) => {
		//Check if Elements are still there
		self.run1(htmlNode, cssString, test, h, HelperInstance)
		test(('check if lis has padding from 10px'), {dom: htmlNode, styles: cssString}, (asset) => {
			let lis = htmlNode.querySelectorAll('li')
			lis.forEach((li) => {
				let pd = getComputedStyle(li).getPropertyValue('padding');
				asset.equal(pd, '10px', "Bitte stellen Sie sicher, dass der Text von allen Seiten um 10px eingerückt ist")


			})
		})
		return Promise.resolve();
	}

	self.run6 = (htmlNode, cssString, test, h, HelperInstance) => {
		//Check if Elements are still there
		self.run1(htmlNode, cssString, test, h, HelperInstance)
		test(('check if lis has padding from 10px'), {dom: htmlNode, styles: cssString}, (asset) => {
			let lis = htmlNode.querySelectorAll('li')
			lis.forEach((li) => {
				let mr = getComputedStyle(li).getPropertyValue('margin-right');
				asset.equal(mr, '5px', "Bitte stellen Sie sicher, dass jedes Listenelement rechts einen Rand von 5px hat")

			})
			asset.end();
		})

		test(('check if lis has padding from 10px'), {dom: htmlNode, styles: cssString}, (asset) => {
			let lis = htmlNode.querySelectorAll('li')
			lis.forEach((li) => {
				let ml = getComputedStyle(li).getPropertyValue('margin-left');
				asset.equal(ml, '5px', "Bitte stellen Sie sicher, dass jedes Listenelement links einen Rand von 5px hat")

			})
			asset.end();
		})
		return Promise.resolve();
	}
	self.run7 = (htmlNode, cssString, test, h, HelperInstance) => {
		//Check if Elements are still there
		self.run1(htmlNode, cssString, test, h, HelperInstance)
		test(('check if lis has padding from 10px'), {dom: htmlNode, styles: cssString}, (asset) => {
			let lis = htmlNode.querySelectorAll('li')
			lis.forEach((li) => {
				let br = getComputedStyle(li).getPropertyValue('border-radius');
				asset.equal(br, '5px', "Bitte stellen Sie sicher, dass jedes Listenelement einen border-raduius von 5px hat")

			})
			asset.end();
		})
		return Promise.resolve();
	}
}

module.exports = test1;