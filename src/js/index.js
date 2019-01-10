
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
import runTest from './testCSS';
// window.addEventListener("beforeunload", function (event) {
//   event.preventDefault();
//   event.returnValue = '';
// });

resizeEditor.vertical();
resizeEditor.horizontal();
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
	autoCloseTags: true,
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

let runBtn = document.querySelector('.runbutton-wrapper');
let html_box = document.querySelector('.html-codearea');
let html_editor = CodeMirror.fromTextArea(html_box, cm_opt_html);

cm_opt_css.mode = 'css';
let css_box = document.querySelector('.css-editor');
let css_editor = CodeMirror.fromTextArea(css_box, cm_opt_css);

html_editor.setValue(objSentFromSrv.htmlsolution_user);
// if(checkCorrectStyleLink()) {

	css_editor.setValue(objSentFromSrv.csssolution_user);
// }

	function css_validator(cm, updateLinting, options) {
		let errors = CodeMirror.lint.css(cm);
		if (errors.filter(e => e.severity === 'error').length > 0) {
		  	runBtn.classList.add('--non-active');
		} else {
			runBtn.classList.remove('--non-active');

		}
		updateLinting(errors);
	}

	function html_validator(cm, updateLinting, options) {
		let errors = CodeMirror.lint.html(cm);
		if (errors.filter(e => e.severity === 'error').length > 0) {
		  	runBtn.classList.add('--non-active');
		} else {
			runBtn.classList.remove('--non-active');

		}
		updateLinting(errors);
	}

	function checkCorrectStyleLink() {
		let html = html_editor.getValue();
		let patt = new RegExp(/<link (?=[^>]*rel=\s*['"]stylesheet['"])(?![^>]*href=\s*['"]http)[^>]*>/i)
		let html_string = html.replace(/'/g, "\\'")
		let url = 'style.css'
		let substring = "<link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\"/>";
		console.log("ja", patt.test(html_string))
		return html_string.includes(substring)
	}

	let prepareSource = function() {
		let html = html_editor.getValue();
		let css = "";
		// if(checkCorrectStyleLink()) {
			css = css_editor.getValue();
		// }
		let src = '';


		// HTML
		src = base_tpl.replace('</body>', html + '</body>');

		// CSS
		let cssReset = "a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,let,video{margin:0;padding:0;border:0;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}*,:after,:before{-webkit-box-sizing:border-box;box-sizing:border-box}";
		css = '<style>' + cssReset + css + '</style>';
		src = src.replace('</head>', css + '</head>');
		return src;
	};
	
	let render = function() {
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
document.querySelector('.run-test-js').addEventListener('click', () => {
	let target = editorRendering.getCSSEditor();
	runTest(target, objSentFromSrv.tasknumber);
	
})

//Close and open Task Wrapper Event Handler
document.querySelector('.close-task').addEventListener('click', closeTask, false);
document.querySelectorAll('.task-number').forEach((taskNumber) => {
	taskNumber.addEventListener('click', () => {toggleTaskSection(taskNumber)}, false);
})

//Evtl auslagern in neue Datei
function closeTask() {
	let wrapper = document.querySelector('.task-description-wrapper');
	wrapper.classList.add('--close');
}

function toggleTaskSection(taskNumber){
	let active = document.querySelector('.task-description.--active');
	let taskDescriptionWrapper = document.querySelector('.task-description-wrapper');
	let id = taskNumber.htmlFor
	taskDescriptionWrapper.classList.toggle('--close');

	//set active class on task-description
	if(active !== null) {
		active.classList.remove('--active');
	}
	document.querySelector(`.task-description`).classList.add('--active');
	
}

//Call Save Code EventHandler
let updateBtn = document.querySelector('.save');
updateBtn.addEventListener('click', () => {
	let html_editor = editorRendering.getHTMLEditor();
	let css_editor = editorRendering.getCSSEditor();
	let savedWrapper = document.querySelector('.code-saved-wrapper')
	fetch('/tasks', {
		method: 'put',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			'tasknumber' : objSentFromSrv.tasknumber,
			'csssolution_user': css_editor.getValue(),
			'htmlsolution_user': html_editor.getValue()
		})
	})

	fetch('/tasks', {method: 'PUT'})
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

document.querySelectorAll('.tab').forEach((tab) => {
	tab.addEventListener('click', toggleTab, false);
})   

function toggleTab(e) {
	console.log(e)

}

// window.addEventListener('keypress', function(event) {
// 	if (event.which == 115 && (event.ctrlKey||event.metaKey)|| (event.which == 19)) {
// 		console.log("in")
// 		event.preventDefault();
// 		saveCode
// 		return false;
// 	}
// 	return true;
// });