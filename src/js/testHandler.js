import {getEditors} from './index.js';
import HtmlDiff from 'htmldiff-js';
let avoidSpamM = require('./module/avoidSpam.js');

var isClickedRun = false;
let editors = getEditors();
let testButtons = document.querySelectorAll('.run-test-js');
testButtons.forEach((button) => {
	button.addEventListener('click', () => {
		let htmlEditor = editors[0]
		let cssEditor = editors[1]
		//Variable for getting correct Path
		let section = document.querySelector('.description-wrapper');
		let sectionNumber = parseInt(section.dataset.sectioninc);
		let sectionPath = section.dataset.sectionpath;
		let taskNumber = parseInt(button.dataset.tasknumber);
		let taskPath = button.dataset.taskpath;
		let tasksArray = parseInt(button.dataset.tasksarray);
		let taskInstanceNumber = document.querySelector('.taskInput:checked').id;
		let taskInstancePath = document.querySelector('.taskInput:checked').dataset.taskinstancepath;
		let sectioninstance = document.querySelector('.header[data-sectioninstancenumber]');
		let sectioninstanceNumber = parseInt(sectioninstance.dataset.sectioninstancenumber);
		let sectioninstancePath = sectioninstance.dataset.sectioninstancepath;
		callTestHandler(htmlEditor, cssEditor, taskInstanceNumber, taskInstancePath, taskNumber, taskPath, sectionNumber, sectionPath, sectioninstanceNumber, sectioninstancePath, tasksArray);
		//Avoid Spamming on button
		avoidSpamM(button, isClickedRun)
	})
})

function callTestHandler(htmlEditor, cssEditor, taskInstanceNumber, taskInstancePath, taskNumber, taskPath, sectionNumber, sectionPath, sectioninstanceNumber, sectioninstancePath, tasksArray) {
	// delete all require cache everytime a test gets called otherwise test can be called only once
	for (const path in require.cache) {
		if (path.endsWith('.js')) { // only clear *.js, not *.node
			delete require.cache[path]
		}
	}
	//Beautify Test result and append to DOM

	//Tape Catch catches all erros in console and displaying in error message 
	//If you want to see error consoles in console uncomment the next line and comment out the tacpe-catch line
	const test = require('tape-css')(require('tape'));
	// const test = require('tape-css')(require('tape-catch'));
	const h = require('hyperscript');
	require('tape-dom')(test);
	const checkTestError = require(`./checkTestError`);
	const helper = require('./helper.js');
	const HtmlDiffer = require('html-differ').HtmlDiffer;
	const CheckInstance = new checkTestError();

	//Reset TestResult before every test run
	let activeTaskinstanceNumberWrapper = document.querySelector(`.description-scroll-wrapper[data-taskinstancenumber="${taskInstanceNumber}"]`);
	let taskInputs = activeTaskinstanceNumberWrapper.querySelectorAll('.task-solved');
	let testOutput = document.querySelector('#tests');
	let errorMsgWrapper = document.querySelector('.error-message-wrapper');
	let errorMsgField = document.querySelector('.error-message');
	if(testOutput !== undefined){
		testOutput.innerHTML = '';
		errorMsgField.innerHTML = '';
		errorMsgWrapper.classList.remove('--active');
	}
	
	let htmlStr = htmlEditor.getValue();
	let htmlNode = document.createElement('html');
	htmlNode.innerHTML = htmlStr;
	const HelperInstance = new helper(htmlNode);
	let cssString = cssEditor.getValue();
	let testFunc = `${taskPath}${taskNumber}`.toString();
	
	
	//Check if Code is Valide
	let runBtn = document.querySelector(`.run-test-js[data-tasknumber="${taskNumber}"]`);
	if(runBtn.classList.contains('validateErrorHTML') || runBtn.classList.contains('validateErrorCSS') || runBtn.classList.contains('validateErrorStylesheet')){
		errorMsgWrapper.classList.add('--active');
		let errorMessageHtml = runBtn.dataset.htmlerror
		let errorMessageStylesheet = runBtn.dataset.stylesheeterror 
		errorMessageHtml !== "" ? errorMessageHtml = "HTML: " + errorMessageHtml : errorMessageHtml = "";
		let errorMessageCss = runBtn.dataset.csserror;
		errorMessageCss !== "" ? errorMessageCss = "CSS: " + errorMessageCss : errorMessageCss = "";
		let totalErrorMessage = "";
		errorMessageCss !== "" && errorMessageHtml !== "" ? totalErrorMessage = `${errorMessageHtml} \n ${errorMessageCss}` : totalErrorMessage = errorMessageHtml + errorMessageCss;
		errorMsgField.innerText = totalErrorMessage + errorMessageStylesheet;
		taskInputs[tasksArray-1].classList.add('--error');
	} else {
		//check if files are existing
		try {
		 	//Require dynamically the correct test file
		 	console.log(`./tests/${sectioninstancePath}${sectioninstanceNumber}/${sectionPath}${sectionNumber}/${taskInstancePath}${taskInstanceNumber}/${testFunc}`)
			let testRun = require(`./tests/${sectioninstancePath}${sectioninstanceNumber}/${sectionPath}${sectionNumber}/${taskInstancePath}${taskInstanceNumber}`);
			let TestInstance = new testRun();
			try {
		 		//Call dynamically the correct test function in test file
		 		console.log(testFunc)
				TestInstance[testFunc](htmlNode, cssString, test, h, HelperInstance)
					.then(() => {
						//Check if Test result is already append to DOM (ASYNC)
						checkElementExists('.assert') 
							.then(() => {
								//Element exists now -> call checkInstance
								CheckInstance.check(taskInstanceNumber, tasksArray);
							});
					}).catch((err) => {
						console.log("No Promise resolved in Test file" + err.message);
					});
			} catch(err) {
				console.log(err.message);
			}
		} catch(err) {
			console.log(err.message);
		}
	}

	const rafAsync = () => {
		return new Promise(resolve => {
			requestAnimationFrame(resolve);
		});
	}

	const checkElementExists = (selector) => {
		if (document.querySelector(selector) === null) {
			return rafAsync().then(() => checkElementExists(selector));
		} else {
			return Promise.resolve(true);
		}
	}
};
