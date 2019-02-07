export function initSVG() {
	document.addEventListener("DOMContentLoaded", function(event) {
		var ajaxIcon = new XMLHttpRequest();
		ajaxIcon.open("GET", "/svg/sprite.svg", true);
		ajaxIcon.send();
		ajaxIcon.onload = function(e) {
			var iconSprite = document.createElement("div");
			iconSprite.innerHTML = ajaxIcon.responseText;
			document.head.insertBefore(iconSprite, document.head.childNodes[0]);
		}   
	});
}