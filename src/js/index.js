import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/lint/lint.js';
import 'codemirror/addon/lint/css-lint.js';
import 'codemirror/addon/lint/html-lint.js';
import 'codemirror/addon/hint/html-hint.js';
import 'codemirror/addon/hint/css-hint.js';
import 'codemirror/addon/edit/closetag.js';
import * as resizeEditor from './resizeEditor';
import importFile from './importFile';
import runTest from './testHandler';
// window.addEventListener("beforeunload", function (event) {
//   event.preventDefault();
//   event.returnValue = '';
// });

console.log("ljsss")

let editorRendering = (() => {
	let base_tpl =
	"<!doctype html>\n" +
	"<html>\n\t" +
      "<head>\n\t\t" +
      "<meta charset=\"utf-8\">\n\t\t" +
      "<title>Test</title>\n\n\t\t\n\t" +
      "</head>\n\t" +
      "<body>\n\t\n\t" +
      "</body>\n" +
     "</html>";

let cm_opt_html = {
	mode: 'text/html',
	gutters: ['CodeMirror-lint-markers'],
	theme: 'lucario',
	indentWithTabs: true,
	lineNumbers: true,
	lint: {
		"getAnnotations": html_validator,
		"async": true 
	},
	autoCloseTags: false,
	extraKeys: {"Ctrl-Space": "autocomplete"},
	onChange: function () {
		render();
	}
};

	let cm_opt_css = {
	mode: 'text/html',
	gutters: ['CodeMirror-lint-markers'],
	theme: 'lucario',
	indentWithTabs: true,
	lint: {
		"getAnnotations": css_validator,
		"async": true 
	},
	lineNumbers: true,
	autoCloseTags: true,
	extraKeys: {"Ctrl-Space": "autocomplete"},
	onChange: function () {
		render();
	}
};

let tasks = document.querySelectorAll('.task');
let html_box = document.querySelector('.html-codearea');
let html_editor = CodeMirror.fromTextArea(html_box, cm_opt_html);

cm_opt_css.mode = 'css';
let css_box = document.querySelector('.css-codearea');
let css_editor = CodeMirror.fromTextArea(css_box, cm_opt_css);

html_editor.setValue(objSentFromSrv.htmlsolution_user);
css_editor.setValue(objSentFromSrv.csssolution_user);

	function css_validator(cm, updateLinting, options) {
		let errors = CodeMirror.lint.css(cm);
		// if (errors.filter(e => e.severity === 'error').length > 0) {
		//   	runBtn.classList.add('--non-active');
		// } else {
		// 	runBtn.classList.remove('--non-active');

		// }
		updateLinting(errors);
	}

	function html_validator(cm, updateLinting, options) {
		let errors = CodeMirror.lint.html(cm);
		// if (errors.filter(e => e.severity === 'error').length > 0) {
		//   	runBtn.classList.add('--non-active');
		// } else {
		// 	runBtn.classList.remove('--non-active');

		// }
		updateLinting(errors);
	}

	function checkCorrectStyleLink() {
		let html = html_editor.getValue();
		let parser = new DOMParser();
		let htmlDoc = parser.parseFromString(html, 'text/html');
		let link = htmlDoc.querySelector('link');
		let boolean = false;
		if(link !== null) {
			if (link.getAttribute('rel') === 'stylesheet' && (link.getAttribute('href') === 'style.css' || link.getAttribute('href') === './style.css' )) {
				boolean = true;
			} else {
				boolean = false;
			}
		}
		return boolean;
	} 

	const prepareSource = function() {
		let html = html_editor.getValue();
		let css = "";
		if(checkCorrectStyleLink()) {
			css = css_editor.getValue();
		}
		let src = '';


		// HTML
		src = base_tpl.replace('</body>', html + '</body>');

		// CSS
		let cssReset = "a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,let,video{margin:0;padding:0;border:0;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}*,:after,:before{-webkit-box-sizing:border-box;box-sizing:border-box}";
		css = '<style>' + cssReset + css + '</style>';
		src = src.replace('</head>', css + '</head>');
		return src;
	};
	
	const render = function() {
		let source = prepareSource();
		let iframe = document.querySelector('.output-iframe');
		let iframe_doc = iframe.contentDocument;
		
		iframe_doc.open();
		iframe_doc.write(source);
		iframe_doc.close();
	};

	html_editor.on("change", function(html_editor, change) {
		render();
	});
	css_editor.on("change", function(css_editor, change) {
		render();
	});
	render();

	return {
		getHTMLEditor:() => {
			return html_editor;
		},
		getCSSEditor:() => {
			return css_editor;
		}
	};
			
})();

//Import Files Event Handler
document.querySelectorAll('.input-file').forEach((input) => {
	input.addEventListener('change', () => {
		let target = null;
		if(input.classList.contains('--html-js')) {
			target = editorRendering.getHTMLEditor()
		} else {
			target = editorRendering.getCSSEditor()
		}
		importFile(input, target)}, false)
});

//Run Tests Event Handler
let testButtons = document.querySelectorAll('.run-test-js');
testButtons.forEach((button) => {
	button.addEventListener('click', () => {
		let htmlEditor = editorRendering.getHTMLEditor();
		let cssEditor = editorRendering.getCSSEditor();
		let testNumber = parseInt(button.dataset.testnumber);
		console.log(testNumber)
		runTest(htmlEditor, cssEditor, objSentFromSrv.tasknumber, testNumber);
	
})

})




//Call Save Code EventHandler
let updateBtn = document.querySelector('.save');
updateBtn.addEventListener('click', () => {
	let html_editor = editorRendering.getHTMLEditor();
	let css_editor = editorRendering.getCSSEditor();
	let savedWrapper = document.querySelector('.code-saved-wrapper')
	fetch('/taskDescription', {
		method: 'put',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			'tasknumber' : objSentFromSrv.tasknumber,
			'csssolution_user': css_editor.getValue(),
			'htmlsolution_user': html_editor.getValue()
		})
	})

	fetch('/taskDescription', {method: 'PUT'})
	.then(res => {
		if (res.ok) return res.json()
	})
	.then(data => {
		savedWrapper.classList.add('--saved');
		setTimeout(() => {
			savedWrapper.classList.remove('--saved');
		}, 1400)
	})
})

// document.querySelectorAll('.tab').forEach((tab) => {
// 	tab.addEventListener('click', toggleTab, false);
// })   

// function toggleTab(e) {
// 	console.log(e)

// }

// window.addEventListener('keypress', function(event) {
// 	if (event.which == 115 && (event.ctrlKey||event.metaKey)|| (event.which == 19)) {
// 		console.log("in")
// 		event.preventDefault();
// 		saveCode
// 		return false;
// 	}
// 	return true;
// });