const test1 = function () {
	let self = this;
	self.run1 = (htmlNode, cssString, test, h, computedStyle) => {
		console.log("Section 2 test 1 run 1")
			const positionOf = (element) => {
			  const {top, right, bottom, left} = element.getBoundingClientRect();
			  return {top, right, bottom, left};
			};

			const styles = cssString;
			const contents = htmlNode.querySelector('.content')
			const child = htmlNode.querySelector('.child')
			const parent = htmlNode.querySelector('.parent')
			const container = htmlNode.querySelector('.container')

			test.only((
			'`.parent` takes up the whole width and height of its container'
			), { dom: htmlNode, styles }, (is) => {
				is.deepEqual(
					positionOf(parent),
					positionOf(container),
					"Bist du sicher, dass .parent die höhe und breite des Containers ausfüllt?"
				);
				is.end();
			});

			test((
			'`.child` grows and shrink to fit its contents'
			), { dom: htmlNode, styles }, (is) => {
				is.deepEqual(
					positionOf(child),
					positionOf(contents)
				);
				is.end();
			});

			test((
			'`.child` is centered horizontally within its `.parent`'
			), { dom: htmlNode, styles }, (is) => {
				is.equal(
					positionOf(parent).right - positionOf(child).right,
					positionOf(child).left - positionOf(parent).left, 
					"Kind-Element sollte horizontal centered sein"
				);
				is.end();
			});

			test((
			'`.child` is centered vertically within its `.parent`'
			), { dom: htmlNode, styles }, (is) => {
				is.equal(
					positionOf(parent).bottom - positionOf(child).bottom,
					positionOf(child).top - positionOf(parent).top
				);
				is.end();
			});

			return Promise.resolve()
   }

	self.run2 = function (htmlNode, cssString, test, h, computedStyle){
		console.log("I'm test 2")
			const positionOf = (element) => {
			  const {top, right, bottom, left} = element.getBoundingClientRect();
			  return {top, right, bottom, left};
			};

			const styles = cssString;
			const contents = htmlNode.querySelector('.content')
			const child = htmlNode.querySelector('.child')
			const parent = htmlNode.querySelector('.parent')
			const container = htmlNode.querySelector('.container')

			test.only((
			'`.parent` takes up the whole width and height of its container'
			), { dom: htmlNode, styles }, (is) => {
				is.deepEqual(
					positionOf(parent),
					positionOf(container),
					"Bist du sicher, dass .parent die höhe und breite des Containers ausfüllt?"
				);
				is.end();
			});

			test((
			'`.child` grows and shrink to fit its contents'
			), { dom: htmlNode, styles }, (is) => {
				is.deepEqual(
					positionOf(child),
					positionOf(contents)
				);
				is.end();
			});

			test((
			'`.child` is centered horizontally within its `.parent`'
			), { dom: htmlNode, styles }, (is) => {
				is.equal(
					positionOf(parent).right - positionOf(child).right,
					positionOf(child).left - positionOf(parent).left, 
					"Kind-Element sollte horizontal centered sein"
				);
				is.end();
			});

			test((
			'`.child` is centered vertically within its `.parent`'
			), { dom: htmlNode, styles }, (is) => {
				is.equal(
					positionOf(parent).bottom - positionOf(child).bottom,
					positionOf(child).top - positionOf(parent).top
				);
				is.end();
			});

			return Promise.resolve()
   };
	self.run3 = function (htmlNode, cssString, test, h, computedStyle){
		console.log("I'm test 2")
			const positionOf = (element) => {
			  const {top, right, bottom, left} = element.getBoundingClientRect();
			  return {top, right, bottom, left};
			};

			const styles = cssString;
			const contents = htmlNode.querySelector('.content')
			const child = htmlNode.querySelector('.child')
			const parent = htmlNode.querySelector('.parent')
			const container = htmlNode.querySelector('.container')

			test.only((
			'`.parent` takes up the whole width and height of its container'
			), { dom: htmlNode, styles }, (is) => {
				is.deepEqual(
					positionOf(parent),
					positionOf(container),
					"Bist du sicher, dass .parent die höhe und breite des Containers ausfüllt?"
				);
				is.end();
			});

			test((
			'`.child` grows and shrink to fit its contents'
			), { dom: htmlNode, styles }, (is) => {
				is.deepEqual(
					positionOf(child),
					positionOf(contents)
				);
				is.end();
			});

			test((
			'`.child` is centered horizontally within its `.parent`'
			), { dom: htmlNode, styles }, (is) => {
				is.equal(
					positionOf(parent).right - positionOf(child).right,
					positionOf(child).left - positionOf(parent).left, 
					"Kind-Element sollte horizontal centered sein"
				);
				is.end();
			});

			test((
			'`.child` is centered vertically within its `.parent`'
			), { dom: htmlNode, styles }, (is) => {
				is.equal(
					positionOf(parent).bottom - positionOf(child).bottom,
					positionOf(child).top - positionOf(parent).top
				);
				is.end();
			});

			return Promise.resolve()
   };
}

module.exports = test1;