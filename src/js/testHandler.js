import {getEditors} from './index.js';
import HtmlDiff from 'htmldiff-js';
let avoidSpam = require('./module/avoidSpam.js');



var isClickedRun = false;
let editors = getEditors();
let testButtons = document.querySelectorAll('.run-test-js');
testButtons.forEach((button) => {
	button.addEventListener('click', () => {
		let htmlEditor = editors[0]
		let cssEditor = editors[1]
		let section = document.querySelector('.description-wrapper');
		let sectionNumber = parseInt(section.dataset.descriptionnumber);
		let testNumber = parseInt(button.dataset.testnumber);
		let testNumberArray = parseInt(button.dataset.testnumberarray);
		let taskInstanceNumber = document.querySelector('.taskInput:checked').id;
		let sectioninstance = document.querySelector('.header[data-sectioninstancenumber]');
		let sectioninstanceNumber = parseInt(sectioninstance.dataset.sectioninstancenumber);
		callTestHandler(htmlEditor, cssEditor, taskInstanceNumber, testNumber, sectionNumber, sectioninstanceNumber, testNumberArray);
		//Avoid Spamming on button
		avoidSpam(button, isClickedRun)
	})
})

function callTestHandler(htmlEditor, cssEditor, taskInstanceNumber, testnumber, sectionNumber, sectioninstanceNumber, testNumberArray) {
	// delete all require cache everytime a test gets called otherwise test can be called only once
	for (const path in require.cache) {
		if (path.endsWith('.js')) { // only clear *.js, not *.node
			delete require.cache[path]
		}
	}
	//Beautify Test result and append to DOM
	require('tap-dev-tool/register');
	require('tap-browser-color')();
	const test = require('tape-css')(require('tape'));
	const h = require('hyperscript');
	require('tape-dom')(test);
	const checkTestError = require(`./checkTestError`);
	const helper = require('./helper.js');
	const HtmlDiffer = require('html-differ').HtmlDiffer;
	const CheckInstance = new checkTestError();
	const HelperInstance = new helper();

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
	let cssString = cssEditor.getValue();
	let runNumber = `run${testnumber}`.toString();
	
	//Check if Code is Valide
	let runBtn = document.querySelector(`.run-test-js[data-testnumber="${testnumber}"]`);
	if(runBtn.classList.contains('validateErrorHTML') || runBtn.classList.contains('validateErrorCSS')){
		errorMsgWrapper.classList.add('--active');
		errorMsgField.innerHTML = "Bitte überprüfen Sie ihren Code auf Validität";
		taskInputs[testNumberArray-1].classList.add('--error');
	} else {
		//check if files are existing
		try {
		 	//Require dynamically the correct test file
		 	console.log(`./tests/sectioninstance${sectioninstanceNumber}/section${sectionNumber}/test${taskInstanceNumber}`)
			let testRun = require(`./tests/sectioninstance${sectioninstanceNumber}/section${sectionNumber}/test${taskInstanceNumber}`);
			let TestInstance = new testRun();
			try {
		 		//Call dynamically the correct test function in test file
				TestInstance[runNumber](htmlNode, cssString, test, h, HelperInstance)
					.then(() => {
						//Check if Test result is already append to DOM (ASYNC)
						checkElementExists('.assert') 
							.then(() => {
								//Element exists now -> call checkInstance
								CheckInstance.check(taskInstanceNumber, testNumberArray);
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
