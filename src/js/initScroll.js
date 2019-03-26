import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

(() => {
	document.addEventListener("DOMContentLoaded", function(event) {
		let arrow = document.querySelector('.arrow-down-svg');
		if(arrow !== null) {
			arrow.addEventListener('click', scrollToView, false)
		}  
	});
})();

let scrollToView = () => {
	document.querySelector('.scroll-to-js').scrollIntoView({ behavior: 'smooth', block: "start"});
}

window.scrollTo = scrollToView;