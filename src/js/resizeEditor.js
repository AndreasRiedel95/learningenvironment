import ResizeObserver from 'resize-observer-polyfill';
import  { getEditors } from'./index.js';

export const vertical = (draggerVertical) => {
	let draggerHorizontal = document.querySelector('.resize.--horizontal')
	let isDown = false;
	let iFrame = document.querySelector('.output-iframe');
	let iFrameWidth = document.querySelector('.size-iframe');
	let errorMessageWrapper = document.querySelector('.error-message-wrapper');
	var ro = new ResizeObserver( entries => {
		for (let entry of entries) {
			const cr = entry.contentRect;
			if(cr.width >= 100) {
				iFrameWidth.style.display = "block";
				iFrameWidth.innerHTML = `${Math.round(cr.width)}px x ${Math.round(cr.height)}px`;
				if(errorMessageWrapper.querySelector('.error-message').innerHTML !== '') {
					errorMessageWrapper.classList.add('--active')
				}
			} else {
				errorMessageWrapper.classList.remove('--active')
				iFrameWidth.style.display = "none";
			}
		}
	});

	ro.observe(iFrame);
	mouseDown();
	function mouseDown(event) {
		isDown = true;
		draggerVertical.classList.add('--active');
		document.body.style.pointerEvents = "none";
		draggerVertical.style.pointerEvents = "all";
		document.addEventListener('mouseup', mouseUp , false);
		document.addEventListener('mouseleave', mouseUp , false);
		document.addEventListener('mousemove', mouseMove, false);
	}

	function mouseMove(event) {
		if(!isDown) return;
		event.preventDefault();
		let wrapper = document.querySelector('.task-editor-wrapper');
		let header = document.querySelector('.header');
		let taskDescriptionWrapper = document.querySelector('.description-wrapper');
		let sidebar  = document.querySelector('.task-number-wrapper');
		let taskDescriptionWrapperWidth = taskDescriptionWrapper.clientWidth; 
		let outputWrapper = document.querySelector('.output');
		let outputWrapperWidth = outputWrapper.clientWidth;
		let x, vw,leftIndex, xNew;

		//Check if First Resizer is clicked
		if(draggerVertical.previousElementSibling.classList.contains('description-scroll-wrapper')) {
			leftIndex =  sidebar.clientWidth
			vw = header.clientWidth - leftIndex;
			x = event.pageX - leftIndex;
			//Fix resizer on left side of vw
			if((vw - x - outputWrapperWidth) <= 0) {
				wrapper.style.gridTemplateColumns =  `50px ${x}px 10px 1fr `;	
			} else {
				//2nd resizer is 1st resizer 
				xNew = vw - x - outputWrapperWidth
				wrapper.style.gridTemplateColumns =  `50px ${x}px minmax(10px, ${xNew}px) 1fr`;	
			}
		} else {
			leftIndex = taskDescriptionWrapperWidth + sidebar.clientWidth
			vw = header.clientWidth - leftIndex 
			x = event.pageX - leftIndex;
			if(x < 0) {
				xNew  = taskDescriptionWrapperWidth + x
				wrapper.style.gridTemplateColumns =  `50px ${xNew}px 10px 1fr`;

			} else if (((x-leftIndex) + 9) >= (vw - leftIndex)) {
				//Rewrite for better solution!
				//Do nothing and fix 2nd resizer on the right side of viewport
			} else {
				wrapper.style.gridTemplateColumns =  `50px ${taskDescriptionWrapperWidth}px minmax(10px, ${x}px) 1fr`;
			}
		}
	}

	function mouseUp(event) {
		draggerVertical.classList.remove('--active')
		isDown = false;
		document.body.style.pointerEvents = "all";
		let editors = getEditors();
		//Refresh so scrollbar is new calculated
		editors[0].refresh();
		editors[1].refresh();
		document.removeEventListener('mousemove', mouseMove, false);
		document.removeEventListener('mouseup', mouseUp , false);
		document.removeEventListener('mouseleave', mouseUp , false);
	}
};

export const horizontal = (draggerHorizontal) => { 
	let isDown = false;
	mouseDown();
	function mouseDown(event) {
		isDown = true;
		document.body.style.pointerEvents = "none"
		draggerHorizontal.style.pointerEvents = "all";
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
		//calculation to fix resizer on top or bottom
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
		document.body.style.pointerEvents = "all"
		isDown = false;
		let editors = getEditors();
		editors[0].refresh();
		editors[1].refresh();
		document.removeEventListener('mousemove', mouseMove, false);
		document.removeEventListener('mouseup', mouseUp , false);
		document.removeEventListener('mouseleave', mouseUp , false);
	}
};

export const setInitalGrid = () => {
	let editorWrapper = document.querySelector('.task-editor-wrapper');
	editorWrapper.style.gridTemplateColumns =  `50px repeat(3, calc((100% - 50px) / 3))`;
}

export const closeDescription = () => {
	let editorWrapper = document.querySelector('.task-editor-wrapper');
	editorWrapper.style.gridTemplateColumns =  `50px 0px repeat(2, calc((100% - 50px) / 2))`;
}

window.closeDescription = closeDescription;
window.setInitialGrid = setInitalGrid;
window.onClickVertical = vertical;
window.onClickHorizontal = horizontal;
