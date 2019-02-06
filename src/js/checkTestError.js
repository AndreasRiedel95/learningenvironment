const checkIfError = function () {
	let self = this;
	self.check = function (testNumber) {
		//TODO Check for right taskInputs and tasks depending on overtask
		let asserts = document.querySelectorAll('.assert');
		let tests = document.querySelector('#tests');
		let errorMsgWrapper = document.querySelector('.error-message-wrapper');
		let errorMsgField = document.querySelector('.error-message');
		let taskInputs = document.querySelectorAll('.task-solved');
		let tasks = document.querySelectorAll('.task');
		asserts.forEach((assert) => {
			document.body.style.backgroundColor = "transparent";
			if(assert.classList.contains('fail')) {
				errorMsgWrapper.classList.add('--active');
				let errMsg = assert.querySelector('.name').innerHTML;
				errorMsgField.innerHTML += "<br>" + errMsg;
				taskInputs[testNumber-1].classList.add('--error');
			} 
			//check if Tests are all OK
			if(!(Array.from(asserts).some(assert => assert.classList.contains('fail')))) {
				taskInputs[testNumber-1].checked = true;
				taskInputs[testNumber-1].classList.remove('--error')
				tasks[testNumber].classList.remove('--not-solved');
			}
		})
	}
}

let closeErrorMessage = () => {
	let errorMsgWrapper = document.querySelector('.error-message-wrapper');
	let errorMsgField = document.querySelector('.error-message');
	errorMsgField.innerHTML = '';
	errorMsgWrapper.classList.remove('--active')
}

window.closeErrorMessage = closeErrorMessage;
module.exports = checkIfError;