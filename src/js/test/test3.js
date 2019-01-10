var test3 = function () {
	var self = this;
	self.run = function (editor, test, h){
		const positionOf = (element) => {
		const {top, right, bottom, left} = element.getBoundingClientRect();
			return {top, right, bottom, left};
		};

		const styles = editor.getValue();
		const contents = h('div', { style: 'width: 193px; height: 122px' });
		const child = h('.child', [contents]);
		const parent = h('.parent', [child]);
		const container = h('.container', { style: 'width: 513px; height: 324px' }, [parent]);
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