const checkIfError = function () {
	let self = this;
	let updateTaskSolved = require('./module/updateTaskSolved')
	self.check = function (taskinstancenumber, testNumberArray) {
		let tests = document.querySelectorAll('.test');
		let errorMsgWrapper = document.querySelector('.error-message-wrapper');
		let errorMsgField = document.querySelector('.error-message');
		let activeTaskinstanceNumberWrapper = document.querySelector(`.description-scroll-wrapper[data-taskinstancenumber="${taskinstancenumber}"]`)
		let taskInputs = activeTaskinstanceNumberWrapper.querySelectorAll('.task-solved');
		let tasks = activeTaskinstanceNumberWrapper.querySelectorAll('.task');
		let taskid = tasks[testNumberArray - 1].dataset.taskid;
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
						taskInputs[testNumberArray-1].classList.add('--error');
						i++;
					}
				} 
			})
		// 		//check if Tests are all OK
			if(!(Array.from(allAsserts).some(assert => assert.classList.contains('fail')))) {
				taskInputs[testNumberArray-1].checked = true;
				taskInputs[testNumberArray-1].classList.remove('--error')
				boolean = true;
				if(tasks[testNumberArray] !== undefined) {
					tasks[testNumberArray].classList.remove('--not-solved');
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