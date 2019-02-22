import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

(function initSVG() {
	document.addEventListener("DOMContentLoaded", function(event) {
		let arrow = document.querySelector('.arrow-down-svg');
		if(arrow !== null) {
			arrow.addEventListener('click', scrollToView, false)
		}
		var ajaxIcon = new XMLHttpRequest();
		ajaxIcon.open("GET", "/svg/sprite.svg", true);
		ajaxIcon.send();
		ajaxIcon.onload = function(e) {
			var iconSprite = document.createElement("div");
			iconSprite.innerHTML = ajaxIcon.responseText;
			document.head.insertBefore(iconSprite, document.head.childNodes[0]);
		}   
	});
})();



let scrollToView = () => {
	document.querySelector('.scroll-to-js').scrollIntoView({ behavior: 'smooth', block: "start"});
}

window.scrollTo = scrollToView;