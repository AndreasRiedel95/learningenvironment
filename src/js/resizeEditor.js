export const onDragger =  function () { 
	let dragger = document.querySelector('.resize');
	let isDown = false;
	let iFrame = document.querySelector('.output-iframe');
	var ro = new ResizeObserver( entries => {
		for (let entry of entries) {
			const cr = entry.contentRect;
			let iFrameWidth = document.querySelector('.size-iframe');
			iFrameWidth.innerHTML = `${cr.width}px x ${cr.height}px`
		}
	});

	ro.observe(iFrame);
	dragger.addEventListener('mousedown', mouseDown, false);


	function mouseDown(event) {
		isDown = true;
		dragger.classList.add('--active');
		document.addEventListener('mouseup', mouseUp , false);
		document.addEventListener('mouseleave', mouseUp , false);
		document.addEventListener('mousemove', mouseMove, false);
	}

	function mouseMove(event) {
		if(!isDown) return;
		event.preventDefault();
		let taskDescriptionWrapper = document.querySelector('.task-description-wrapper.--close');
		let wrapper = document.querySelector('.wrapper');
		let header = document.querySelector('.header');
		let leftIndex = 0;
		if(taskDescriptionWrapper !== null) {
			leftIndex = 50
		} else {
			leftIndex = 450
		}
		
		let w = header.clientWidth - leftIndex
		let x = event.pageX - leftIndex;
		if(x <= 0) {
			x = 0
		} else if (x > w - 5 ) {
			x = w - 5
		}
		

		wrapper.style.gridTemplateColumns =  `${x}px 1fr`
		dragger.style.left = `${x}px`;

	}

	function mouseUp(event) {
		dragger.classList.remove('--active')
		isDown = false;
		document.querySelectorAll('.code-editors').forEach((editor) => {
			editor.pointerEvents = "all";
		});
		
		document.removeEventListener('mousemove', mouseMove, false);
		document.removeEventListener('mouseup', mouseUp , false);
		document.removeEventListener('mouseleave', mouseUp , false);
	}
};

