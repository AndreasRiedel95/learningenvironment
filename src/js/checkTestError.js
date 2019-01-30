const checkIfError = function () {
	let self = this;
	self.check = function (testNumber) {
		let asserts = document.querySelectorAll('.assert')
		let tests = document.querySelector('#tests');
		let errorMsgField = document.querySelector('.error-message');
		let taskInputs = document.querySelectorAll('.task-solved');
		let tasks = document.querySelectorAll('.task')
		asserts.forEach((assert) => {
			document.body.style.backgroundColor = "transparent"
			if(assert.classList.contains('fail')) {
				errorMsgField.classList.add('--active')
				let errMsg = assert.querySelector('.name').innerHTML
				console.log(errMsg)
				errorMsgField.innerHTML += "<br>" + errMsg

			}  
			if(!(Array.from(asserts).some(assert => assert.classList.contains('fail')))) {
				taskInputs[testNumber-1].checked = true;
				console.log(taskInputs)
				tasks[testNumber].classList.remove('--not-solved')
			}
		})
	}
}

module.exports = checkIfError;