export default function (htmlEditor, cssEditor, tasknumber, testnumber) {
	// delete all require cache everytime a test gets called
	for (const path in require.cache) {
		if (path.endsWith('.js')) { // only clear *.js, not *.node
			delete require.cache[path]
		}
	}
	//Beautify Test result
	require('tap-dev-tool/register');
	const test = require('tape-css')(require('tape'));
	const h = require('hyperscript');
	const computedStyle = require('computed-style');
	
	let htmlStr = htmlEditor.getValue()
	let htmlNode = document.createElement( 'html' );
	htmlNode.innerHTML = htmlStr;
	let cssString = cssEditor.getValue();

	let testFunc = `run${testnumber}`;
	let tesFuncString = testFunc.toString();
	try {
		//Require dynamically the correct test file
		let testRun = require(`./test/test${tasknumber}`);
		let TestInstance = new testRun();
		try {
			//Call dynamically the correct test function in test file
			TestInstance[tesFuncString](htmlNode, cssString, test, h, computedStyle);
		}
		catch(err) {
			console.log(err.message);
		}
	} catch(err) {
		console.log(err.message);
	}
};
