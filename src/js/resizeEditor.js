import ResizeObserver from 'resize-observer-polyfill';

export const vertical =  function (draggerVertical) {
	let draggerHorizontal = document.querySelector('.resize.--horizontal')
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
	mouseDown();
	function mouseDown(event) {
		isDown = true;
		draggerVertical.classList.add('--active');
		document.addEventListener('mouseup', mouseUp , false);
		document.addEventListener('mouseleave', mouseUp , false);
		document.addEventListener('mousemove', mouseMove, false);
	}

	function mouseMove(event) {
		if(!isDown) return;
		event.preventDefault();
		let wrapper = document.querySelector('.task-editor-wrapper');
		let header = document.querySelector('.header');
		let taskDescriptionWrapper = document.querySelector('.task-description-wrapper');
		let sidebar  = document.querySelector('.task-number-wrapper');
		let taskDescriptionWrapperWidth = taskDescriptionWrapper.clientWidth; 
		let outputWrapper = document.querySelector('.output');
		let outputWrapperWidth = outputWrapper.clientWidth;
		let codeWidth = document.querySelector('.html-css-wrapper').clientWidth 
		let x,
			w,
			leftIndex,
			xNew;

		if(draggerVertical.previousElementSibling.classList.contains('description-scroll-wrapper')) {
			leftIndex =  sidebar.clientWidth
			w = header.clientWidth - leftIndex;
			x = event.pageX - leftIndex;
			if((w - x - outputWrapperWidth) <= 0) {
				wrapper.style.gridTemplateColumns =  `50px ${x}px 0 1fr `;	
			} else {
				xNew = w - x - outputWrapperWidth
				wrapper.style.gridTemplateColumns =  `50px ${x}px ${xNew}px 1fr`;	
			}
		} else {
			leftIndex = taskDescriptionWrapperWidth + sidebar.clientWidth
			w = header.clientWidth - leftIndex 
			x = event.pageX - leftIndex;
			if(x < 0) {
				xNew  = taskDescriptionWrapperWidth + x
				wrapper.style.gridTemplateColumns =  `50px ${xNew}px 0px 1fr`;
			} else {

				wrapper.style.gridTemplateColumns =  `50px ${taskDescriptionWrapperWidth}px ${x}px 1fr`;
			}
		}
	}

	function mouseUp(event) {
		draggerVertical.classList.remove('--active')
		isDown = false;
		document.removeEventListener('mousemove', mouseMove, false);
		document.removeEventListener('mouseup', mouseUp , false);
		document.removeEventListener('mouseleave', mouseUp , false);
	}
};

export const horizontal =  function (draggerHorizontal) { 
	let isDown = false;
	mouseDown();
	function mouseDown(event) {
		isDown = true;
		draggerHorizontal.classList.add('--active');
		document.addEventListener('mouseup', mouseUp , false);
		document.addEventListener('mouseleave', mouseUp , false);
		document.addEventListener('mousemove', mouseMove, false);
	}

	function mouseMove(event) {
		if(!isDown) return;
		event.preventDefault();
		let topIndex = 50
		let wrapper = document.querySelector('.html-css-wrapper');
		let x = event.pageY - topIndex;
		var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		if(x <= 10) {
			x = 0
		} else if (x > h - 60){
			x = h - 60
		}
		wrapper.style.gridTemplateRows =  `${x}px 1fr`
		draggerHorizontal.style.top = `${x}px`;

	}

	function mouseUp(event) {
		draggerHorizontal.classList.remove('--active')
		isDown = false;
		document.removeEventListener('mousemove', mouseMove, false);
		document.removeEventListener('mouseup', mouseUp , false);
		document.removeEventListener('mouseleave', mouseUp , false);
	}
};

window.onClickVertical = vertical;
window.onClickHorizontal = horizontal;
