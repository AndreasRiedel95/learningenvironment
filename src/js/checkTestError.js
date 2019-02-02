const checkIfError = function () {
	let self = this;
	self.check = function (testNumber) {
		//TODO Check for right taskInputs and tasks depending on overtask
		let asserts = document.querySelectorAll('.assert');
		let tests = document.querySelector('#tests');
		let errorMsgField = document.querySelector('.error-message');
		let taskInputs = document.querySelectorAll('.task-solved');
		let tasks = document.querySelectorAll('.task');
		asserts.forEach((assert) => {
			document.body.style.backgroundColor = "transparent";
			if(assert.classList.contains('fail')) {
				errorMsgField.classList.add('--active');
				let errMsg = assert.querySelector('.name').innerHTML;
				errorMsgField.innerHTML += "<br>" + errMsg;

			} 
			//check if Tests are all OK
			if(!(Array.from(asserts).some(assert => assert.classList.contains('fail')))) {
				taskInputs[testNumber-1].checked = true;
				tasks[testNumber].classList.remove('--not-solved');
			}
		})
	}
}

module.exports = checkIfError;