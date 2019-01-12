var test1 = function () {
	var self = this;
	self.run = function (editor, test, h, computedStyle, jsdiff, pretty){
		const html = editor.getValue()
		let parser = new DOMParser();
		let htmlDoc = parser.parseFromString(html, 'text/html');
		let styles = [];
		let ps = htmlDoc.querySelectorAll('p')
		if(ps.length === 3) {
			ps.forEach((p) => {
				styles.push(p.style.backgroundColor)

		})
			if(checkArray(styles)) {
				const p1 = h('.p1', { style: `background-color: ${styles[0]}` });
				const p2 = h('.p2', { style: `background-color: ${styles[1]}` });
				const p3 = h('.p3', { style: `background-color: ${styles[2]}` });

				test(('`p` haben unterschiedliche farben'),
				{ dom: h('div', [p1, p2, p3]) }, (is) => {
			  		is.notDeepEqual(
						colorOf(p1),
						colorOf(p2),
						colorOf(p3)
			  		);
			  		is.end();

				});
			} else {
				throwErr()
			}
		} else {
			throwErr()
		}

		function checkArray(my_arr){
			for(var i=0;i<my_arr.length;i++){
				if(my_arr[i] === "")   
					return false;
			}
			return true;
		}

		function throwErr(){
			console.log("HTML Error")
		}
   };
}

module.exports = test1;