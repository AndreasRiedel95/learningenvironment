//self.absaetze_einfaerben3 – Absätze einfärben,//self.elemente_erstellen25 – Elemente erstellen,
//self.boxen_einfaerben10 – Boxen einfärben ,//self.boxen_positionieren11 – Boxen positionieren,
const absaetze_einfuehrung9 = function () {
	let self = this;
	self.elemente_erstellen25 = (htmlNode, cssString, test, h, HelperInstance) => {
		let div1 = h('div');
		let div2 = h('div', [div1])
		console.log(div2)
		test(('check if image is there '), { dom: htmlNode }, (asset) => {
			let dom = htmlNode.querySelector('div')
			console.log(dom)
			console.log(HelperInstance.htmlDifferences(div2, dom, 'strict'))
			asset.end();
		}); 
		return Promise.resolve()
	}
}

module.exports = absaetze_einfuehrung9;//self.boxen_einfaerben10 – Boxen einfärben ,//self.boxen_positionieren11 – Boxen positionieren,//self.boxen_einfaerben10 – Boxen einfärben ,//self.boxen_positionieren11 – Boxen positionieren,//self.boxen_einfaerben10 – Boxen einfärben ,//self.boxen_positionieren11 – Boxen positionieren,//self.boxen_einfaerben10 – Boxen einfärben ,//self.boxen_positionieren11 – Boxen positionieren,