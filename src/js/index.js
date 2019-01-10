delete require.cache[require.resolve('./testCSS')]
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
console.log(objSentFromSrv)

resizeEditor.vertical();
resizeEditor.horizontal();

let editorRendering = (() => {
	var base_tpl =
	"<!doctype html>\n" +
	"<html>\n\t" +
      "<head>\n\t\t" +
      "<meta charset=\"utf-8\">\n\t\t" +
      "<title>Test</title>\n\n\t\t\n\t" +
      "</head>\n\t" +
      "<body>\n\t\n\t" +
      "</body>\n" +
     "</html>";
	

var cm_opt_html = {
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

	var cm_opt_css = {
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
let runBtn = document.querySelector('.runbutton-wrapper')

var html_box = document.querySelector('.html-codearea');
var html_editor = CodeMirror.fromTextArea(html_box, cm_opt_html);

cm_opt_css.mode = 'css';
var css_box = document.querySelector('#css textarea');
var css_editor = CodeMirror.fromTextArea(css_box, cm_opt_css);

	function css_validator(cm, updateLinting, options) {
		var errors = CodeMirror.lint.css(cm);
		if (errors.filter(e => e.severity === 'error').length > 0) {
		  	runBtn.classList.add('--non-active');
		} else {
			runBtn.classList.remove('--non-active');

		}
		updateLinting(errors);


	};

	function html_validator(cm, updateLinting, options) {
		var errors = CodeMirror.lint.html(cm);
		if (errors.filter(e => e.severity === 'error').length > 0) {
		  	runBtn.classList.add('--non-active');
		} else {
			runBtn.classList.remove('--non-active');

		}
		updateLinting(errors);

		

	}



	var prepareSource = function() {
		var html = html_editor.getValue(),
				css = css_editor.getValue(),
				// js = js_editor.getValue(),
				src = '';
		// HTML
		src = base_tpl.replace('</body>', html + '</body>');
		
		// CSS
		let cssReset = "a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}*,:after,:before{-webkit-box-sizing:border-box;box-sizing:border-box}";
		css = '<style>' + cssReset + css + '</style>';
		src = src.replace('</head>', css + '</head>');
		
		return src;
	};
	
	var render = function() {
		var source = prepareSource();
		
		var iframe = document.querySelector('.output-iframe'),
				iframe_doc = iframe.contentDocument;
		
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
	
	css_editor.setValue(objSentFromSrv.csssolution_user);

	html_editor.setValue(objSentFromSrv.htmlsolution_user)


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
	runTest(target);
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


let updateBtn = document.querySelector('.save');
updateBtn.addEventListener('click', () => {
	let html_editor = editorRendering.getHTMLEditor();
	let css_editor = editorRendering.getCSSEditor();
	let savedWrapper = document.querySelector('.code-saved-wrapper')
	console.log(html_editor.getValue())
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


// window.addEventListener('keypress', function(event) {
// 	if (event.which == 115 && (event.ctrlKey||event.metaKey)|| (event.which == 19)) {
// 		console.log("in")
// 		event.preventDefault();
// 		saveCode
// 		return false;
// 	}
// 	return true;
// });

