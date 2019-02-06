export default (htmlEditor, cssEditor, tasknumber, testnumber) => {
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
	require('tape-dom')(test);
	const h = require('hyperscript');
	const computedStyle = require('computed-style');
	const checkIfError = require(`./checkTestError`);
	const CheckInstance = new checkIfError();

	//Reset TestResult before every testrun
	let testOutput = document.querySelector('#tests');
	let errorMsgWrapper = document.querySelector('.error-message-wrapper');
	let errorMsgField = document.querySelector('.error-message');
	if(testOutput !== undefined){
		testOutput.innerHTML = '';
		errorMsgField.innerHTML = '';
		errorMsgWrapper.classList.remove('--active')
	}
	
	let htmlStr = htmlEditor.getValue()
	let htmlNode = document.createElement( 'html' );
	htmlNode.innerHTML = htmlStr;
	let cssString = cssEditor.getValue();
	let runFunc = `run${testnumber}`.toString();
	
	//check if files are existing
	try {
		//Require dynamically the correct test file
		let testRun = require(`./test/test${tasknumber}`);
		let TestInstance = new testRun();
		try {
			//Call dynamically the correct test function in test file
			TestInstance[runFunc](htmlNode, cssString, test, h, computedStyle, testnumber)
				.then(() => {
					//Check if Test result is append to DOM
					checkElementExists('.assert') 
						.then(() => {
							//Element exists now
							CheckInstance.check(testnumber)
						});
				});
		} catch(err) {
			console.log(err.message);
		}
	} catch(err) {
		console.log(err.message);
	}

	const rafAsync = () => {
		return new Promise(resolve => {
			requestAnimationFrame(resolve);
		});
	}

	const checkElementExists = (selector) => {
		console.log(document.querySelector(selector))
		if (document.querySelector(selector) === null) {
			return rafAsync().then(() => checkElementExists(selector));
		} else {
			return Promise.resolve(true);
		}
	}
};
