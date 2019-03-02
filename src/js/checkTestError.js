const checkIfError = function () {
	let self = this;
	let updateTaskSolved = require('./module/updateTaskSolved')
	self.check = function (tasknumber, testNumber) {
		let tests = document.querySelectorAll('.test');
		let errorMsgWrapper = document.querySelector('.error-message-wrapper');
		let errorMsgField = document.querySelector('.error-message');
		let activeTaskNumberWrapper = document.querySelector(`.description-scroll-wrapper[data-tasknumber="${tasknumber}"]`)
		let taskInputs = activeTaskNumberWrapper.querySelectorAll('.task-solved');
		let tasks = activeTaskNumberWrapper.querySelectorAll('.task');
		let taskid = tasks[testNumber - 1].dataset.taskid;
		let boolean = false;
		let allAsserts = document.querySelectorAll('.assert');
		tests.forEach((test) => {
			let asserts = test.querySelectorAll('.assert');
			let i = 0;
			asserts.forEach((assert) => {
				document.body.style.backgroundColor = "transparent";
				if(assert.classList.contains('fail')) {
					errorMsgWrapper.classList.add('--active');
					if(i === 0) {
						let fail = test.querySelectorAll('.fail')[0]
						let errMsg = fail.querySelector('.name').innerHTML;
						errorMsgField.innerHTML += "<br>" + errMsg;
						taskInputs[testNumber-1].classList.add('--error');
						i++;
					}
				} 
			})
		// 		//check if Tests are all OK
			if(!(Array.from(allAsserts).some(assert => assert.classList.contains('fail')))) {
				taskInputs[testNumber-1].checked = true;
				taskInputs[testNumber-1].classList.remove('--error')
				boolean = true;
				if(tasks[testNumber] !== undefined) {
					tasks[testNumber].classList.remove('--not-solved');
				}
										
			}
			
		})
		updateTaskSolved(taskid, boolean);
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