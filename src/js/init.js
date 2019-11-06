//Because this application is developed for chrome, 
//we have to check which browser is used on init and show a modal
window.onload = () => {
	var isChromium = window.chrome;
	var winNav = window.navigator;
	var vendorName = winNav.vendor;
	var isOpera = typeof window.opr !== "undefined";
	var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
	var isIOSChrome = winNav.userAgent.match("CriOS");

	if (isIOSChrome) {
	   // is Google Chrome on IOS
	} else if(
	  isChromium !== null &&
	  typeof isChromium !== "undefined" &&
	  vendorName === "Google Inc." &&
	  isOpera === false &&
	  isIEedge === false
	) {} else { 
	   let modal = document.querySelector('.modal')
	   modal.classList.add('m--active-modal')
	}
}

const closeModal = () => {
	let modal = document.querySelector('.modal')
	modal.classList.remove('m--active-modal')
}

window.closeModal = closeModal;