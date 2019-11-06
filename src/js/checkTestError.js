const checkIfError = function () {
	let self = this;
	let updateTaskSolved = require('./module/updateTaskSolved');

	//Check if solution is correct by geting the error message from tape-css
	//which is appended to the body element and hidden
	//Prepare error message and put it into the error message wrapper
	//If an general JavaScript error happens show this error in the error message wrapper
	self.check = function (taskinstancenumber, testNumberArray) {
		let tests = document.querySelectorAll('.test');
		let errorMsgWrapper = document.querySelector('.error-message-wrapper');
		let errorMsgField = document.querySelector('.error-message');
		let activeTaskinstanceNumberWrapper = document.querySelector(`.description-scroll-wrapper[data-taskinstancenumber="${taskinstancenumber}"]`);
		let taskInputs = activeTaskinstanceNumberWrapper.querySelectorAll('.task-solved');
		let tasks = activeTaskinstanceNumberWrapper.querySelectorAll('.task');
		let taskid = tasks[testNumberArray].dataset.taskid;
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
						let fail = test.querySelectorAll('.fail')[0];
						let errMsg = fail.querySelector('.name').innerHTML;
						//TODO Make array of errors which shpuld not show up
						if(((errMsg.indexOf("TypeError") === -1) && (errMsg.indexOf("ReferenceError") === -1) )) {
							errorMsgField.innerHTML += errMsg + "<br />";
							taskInputs[testNumberArray].classList.add('--error');
							i++;
						} else if(errMsg.indexOf("TypeError") >= 0) {
							errorMsgField.innerHTML += "TypeError: Erwartetes Element existiert nicht" + "<br />";
							taskInputs[testNumberArray].classList.add('--error');
							i++;
						} else {
							errorMsgField.innerHTML += "ReferenceError: Variable existiert nicht." + "<br />";
							taskInputs[testNumberArray].classList.add('--error');
							i++;
						}
					}
				} 
			})
			 //check if Tests are all OK
			 // if true then remove error message
			if(!(Array.from(allAsserts).some(assert => assert.classList.contains('fail')))) {
				taskInputs[testNumberArray].checked = true;
				taskInputs[testNumberArray].classList.remove('--error');
				boolean = true;
				// remove not solved of next element 
				if(tasks[testNumberArray + 1] !== undefined) {
					tasks[testNumberArray + 1].classList.remove('--not-solved');
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
	errorMsgWrapper.classList.remove('--active');
}

window.closeErrorMessage = closeErrorMessage;
module.exports = checkIfError;