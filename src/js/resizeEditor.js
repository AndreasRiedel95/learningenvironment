import ResizeObserver from 'resize-observer-polyfill';

export const vertical =  function () { 
	let draggerVertical = document.querySelector('.resize.--vertical');
	let draggerHorizontal = document.querySelector('.resize.--horizontal');	
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
	draggerVertical.addEventListener('mousedown', mouseDown, false);


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
		} else if (x > w - 10 ) {
			x = w - 10
		}
		
		wrapper.style.gridTemplateColumns =  `${x}px 1fr`
		draggerVertical.style.left = `${x}px`;
		draggerHorizontal.style.width = `${x}px`;

	}

	function mouseUp(event) {
		draggerVertical.classList.remove('--active')
		isDown = false;
		document.querySelectorAll('.code-editors').forEach((editor) => {
			editor.pointerEvents = "all";
		});
		
		document.removeEventListener('mousemove', mouseMove, false);
		document.removeEventListener('mouseup', mouseUp , false);
		document.removeEventListener('mouseleave', mouseUp , false);
	}
};

export const horizontal =  function () { 
	let draggerVertical = document.querySelector('.resize.--vertical');
	let draggerHorizontal = document.querySelector('.resize.--horizontal');	
	let isDown = false;
	draggerHorizontal.addEventListener('mousedown', mouseDown, false);


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
		let wrapper = document.querySelector('.wrapper');
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
		draggerVertical.classList.remove('--active')
		isDown = false;
		document.querySelectorAll('.code-editors').forEach((editor) => {
			editor.pointerEvents = "all";
		});
		
		document.removeEventListener('mousemove', mouseMove, false);
		document.removeEventListener('mouseup', mouseUp , false);
		document.removeEventListener('mouseleave', mouseUp , false);
	}
};



