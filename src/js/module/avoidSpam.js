const avoidSpam = (button, isClicked) => {
	if (isClicked) {
		return;
	}
	var isClicked = true;
	button.style.pointerEvents = 'none'
	setTimeout(() => {
		button.style.pointerEvents = 'all'
		isClicked = false;
	}, 2000)
}

module.exports = avoidSpam;