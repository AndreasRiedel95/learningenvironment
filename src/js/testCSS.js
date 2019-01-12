export default function (editor, tasknumber) {
	// delete all require cache everytime a test gets called
	for (const path in require.cache) {
		if (path.endsWith('.js')) { 
			delete require.cache[path]
		}
	}

	require('tap-dev-tool/register');
	const test = require('tape-css')(require('tape'));
	const h = require('hyperscript');
	const computedStyle = require('computed-style');
	let jsdiff = require('diff');
	const pretty = require('pretty');
	let testRun = require(`./test/test${tasknumber}`);
	var TestInstance = new testRun();
	TestInstance.run(editor, test, h, computedStyle, jsdiff, pretty);
};
