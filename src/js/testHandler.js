export default (htmlEditor, cssEditor, tasknumber, testnumber, sectionNumber, sectioninstanceNumber) => {
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
	const checkIfError = require(`./checkTestError`);
	const CheckInstance = new checkIfError();

	//Reset TestResult before every test run
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
	let runNumber = `run${testnumber}`.toString();
	
	//check if files are existing
	try {
	// 	//Require dynamically the correct test file
		let testRun = require(`./tests/sectioninstance${sectioninstanceNumber}/section${sectionNumber}/test${tasknumber}`);

		let TestInstance = new testRun();
		try {
	// 		//Call dynamically the correct test function in test file
			TestInstance[runNumber](htmlNode, cssString, test, testnumber)
				.then(() => {
	// 				//Check if Test result is already append to DOM (ASYNC)
					checkElementExists('.assert') 
						.then(() => {
							//Element exists now
							CheckInstance.check(tasknumber, testnumber)
						});
				}).catch((err) => {
					console.log("No Promise resolved in Test file" + err.message)
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
		if (document.querySelector(selector) === null) {
			return rafAsync().then(() => checkElementExists(selector));
		} else {
			return Promise.resolve(true);
		}
	}
};
