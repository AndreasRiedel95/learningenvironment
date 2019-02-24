const checkIfError = function () {
	let self = this;
	self.check = function (tasknumber, testNumber) {
		let asserts = document.querySelectorAll('.assert');
		let tests = document.querySelector('#tests');
		let errorMsgWrapper = document.querySelector('.error-message-wrapper');
		let errorMsgField = document.querySelector('.error-message');
		let activeTaskNumberWrapper = document.querySelector(`.description-scroll-wrapper[data-tasknumber="${tasknumber}"]`)
		let taskInputs = activeTaskNumberWrapper.querySelectorAll('.task-solved');
		let tasks = activeTaskNumberWrapper.querySelectorAll('.task');
		let taskid = tasks[testNumber - 1].dataset.taskid;
		asserts.forEach((assert) => {
			document.body.style.backgroundColor = "transparent";
			if(assert.classList.contains('fail')) {
				udpateTaskSolved(taskid, false);
				errorMsgWrapper.classList.add('--active');
				let errMsg = assert.querySelector('.name').innerHTML;
				errorMsgField.innerHTML += "<br>" + errMsg;
				taskInputs[testNumber-1].classList.add('--error');
				
			} 
			//check if Tests are all OK
			if(!(Array.from(asserts).some(assert => assert.classList.contains('fail')))) {
				udpateTaskSolved(taskid, true);
				taskInputs[testNumber-1].checked = true;
				taskInputs[testNumber-1].classList.remove('--error')
				if(tasks[testNumber] !== undefined) {
					tasks[testNumber].classList.remove('--not-solved');
				}
				
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

let udpateTaskSolved = (taskid, boolean) => {
	fetch(`/admin/solved/task/${taskid}/update`, {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			'id' : taskid,
			'task_solved': boolean
		})
	})
}

window.closeErrorMessage = closeErrorMessage;
module.exports = checkIfError;