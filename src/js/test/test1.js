var test1 = function () {
	let self = this;
	self.run1 = function (htmlNode, cssString, test, h, computedStyle){

		const colorOf = (element) => {
			let bColor = window.getComputedStyle(element, null).getPropertyValue("background-color");
			console.log("color", bColor)
			return bColor;
		};
		test(('Auf der Seite befinden sich 3 p-Elemente'),
		{ dom: htmlNode }, (t) => {
	  		t.deepEqual(
	  			htmlNode.querySelectorAll('p').length, 3
	  		);
	  		t.end();

		});
		test(('jedes `p` Element besitzt ein Attibute style '),
		{ dom: htmlNode}, (t) => {
			let ps = htmlNode.querySelectorAll('p').forEach((p) => {
	  			t.equal(
	  				p.hasAttribute('style'), true
	  			);
	  		})
	  		t.end();
		});
		test(('`p` haben verschiedene Farben'),
		{ dom: htmlNode}, (t) => {
			let ps = htmlNode.querySelectorAll('p');
			for(let i = 0; i < ps.length - 1; i++) {
				for (let j = i + 1; j < ps.length; j++) {
					t.notDeepEqual(
						ps[i].style.backgroundColor,
						ps[j].style.backgroundColor
					);
				}
			}
	  		t.end();
		});
   };
}

module.exports = test1;