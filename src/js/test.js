export default function (htmlEditor, cssEditor, tasknumber) {
	// delete all require cache everytime a test gets called
	for (const path in require.cache) {
			delete require.cache[path]
	}
	console.log("are you compiling fast?")
	require('tap-dev-tool/register');
	const test = require('tape-css')(require('tape'));
	const h = require('hyperscript');
	const computedStyle = require('computed-style');
	let testRun = require(`./test/test${tasknumber}`);
	let TestInstance = new testRun();
	let htmlStr = htmlEditor.getValue()
	let htmlNode = document.createElement( 'html' );
	htmlNode.innerHTML = htmlStr;
	let cssString = cssEditor.getValue();
	TestInstance.run(htmlNode, cssString, test, h, computedStyle);
};
