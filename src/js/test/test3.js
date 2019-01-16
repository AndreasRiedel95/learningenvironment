var test3 = function () {
	let self = this;
	self.run1 = function (htmlNode, cssString, test, h, computedStyle){
		console.log("Im test 1")
		const positionOf = (element) => {
		  const {top, right, bottom, left} = element.getBoundingClientRect();
		  return {top, right, bottom, left};
		};

		const styles = cssString;
		const contents = h('div');
		const child = h('.child', [contents]);
		const parent = h('.parent', [child]);
		const container = h('div', [parent]);

		test((
		  '`.parent` takes up the whole width and height of its container'
		), { dom: container, styles }, (is) => {
		  is.deepEqual(
		    positionOf(parent),
		    positionOf(container)
		  );
		  is.end();
		});

		test((
		  '`.child` grows and shrink to fit its contents'
		), { dom: container, styles }, (is) => {
		  is.deepEqual(
		    positionOf(child),
		    positionOf(contents)
		  );
		  is.end();
		});

		test((
		  '`.child` is centered horizontally within its `.parent`'
		), { dom: container, styles }, (is) => {
		  is.equal(
		    positionOf(parent).right - positionOf(child).right,
		    positionOf(child).left - positionOf(parent).left
		  );
		  is.end();
		});

		test((
		  '`.child` is centered vertically within its `.parent`'
		), { dom: container, styles }, (is) => {
		  is.equal(
		    positionOf(parent).bottom - positionOf(child).bottom,
		    positionOf(child).top - positionOf(parent).top
		  );
		  is.end();
		});
   };
	self.run2 = function (htmlNode, cssString, test, h, computedStyle){
		console.log("Im test 2")
		const positionOf = (element) => {
		  const {top, right, bottom, left} = element.getBoundingClientRect();
		  return {top, right, bottom, left};
		};

		const styles = cssString;
		const contents = h('div');
		const child = h('.child', [contents]);
		const parent = h('.parent', [child]);
		const container = h('div', [parent]);

		test((
		  '`.parent` takes up the whole width and height of its container'
		), { dom: container, styles }, (is) => {
		  is.deepEqual(
		    positionOf(parent),
		    positionOf(container)
		  );
		  is.end();
		});

		test((
		  '`.child` grows and shrink to fit its contents'
		), { dom: container, styles }, (is) => {
		  is.deepEqual(
		    positionOf(child),
		    positionOf(contents)
		  );
		  is.end();
		});

		test((
		  '`.child` is centered horizontally within its `.parent`'
		), { dom: container, styles }, (is) => {
		  is.equal(
		    positionOf(parent).right - positionOf(child).right,
		    positionOf(child).left - positionOf(parent).left
		  );
		  is.end();
		});

		test((
		  '`.child` is centered vertically within its `.parent`'
		), { dom: container, styles }, (is) => {
		  is.equal(
		    positionOf(parent).bottom - positionOf(child).bottom,
		    positionOf(child).top - positionOf(parent).top
		  );
		  is.end();
		});
   };
}

module.exports = test3;