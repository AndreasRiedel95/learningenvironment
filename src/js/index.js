import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/lint/lint.js';
import 'codemirror/addon/lint/css-lint.js';
import 'codemirror/addon/lint/html-lint.js';
import 'codemirror/addon/hint/html-hint.js';
import 'codemirror/addon/hint/css-hint.js';
import 'codemirror/addon/scroll/simplescrollbars.js';
import * as resizeEditor from './resizeEditor';
import { importFile, exportFile } from './importExportFile';

//Require Module
const avoidSpamM = require('./module/avoidSpam.js');
const onceM = require('./module/once.js');
const updateTaskSolvedM = require('./module/updateTaskSolved');
const saveCodeM = require('./module/saveCode');
const resetUserCodeM = require('./module/resetUserCode');

// window.addEventListener("beforeunload", function (event) {
//   event.preventDefault();
//   event.returnValue = '';
// });

console.log(section)

document.addEventListener("DOMContentLoaded", () => {
	let taskDescriptions = document.querySelectorAll(`.description-scroll-wrapper:not([data-description="description"])`);
	taskDescriptions.forEach(taskDescription => {
		let tasks = taskDescription.querySelectorAll('.task');
		let taskInputs = taskDescription.querySelectorAll('.task-solved');
		//remove --not-solved class from first Task, so student is able to run test for it 
		tasks[0].classList.remove('--not-solved'); 
		//find first Task-Input which is not checked
		var result = Array.from(taskInputs).filter(taskInput => taskInput.checked === false)[0];
		//find index of first Task-Input which is not checked
		var index = Array.from(taskInputs).findIndex(taskInput => taskInput === result);
		//remove --not-solved class on Task, so student is able to run test for it
		if(tasks[index] !== undefined) { 
			tasks[index].classList.remove('--not-solved');
		}

	})
});

let editorRendering = (() => {
	//Base template for Output 
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

     //options for code editor
	let cm_opt_html = {
		mode: 'text/html',
		gutters: ['CodeMirror-lint-markers'],
		theme: 'lucario',
		indentWithTabs: true,
		showCursorWhenSelecting: true,
		fixedGutter: true,
		scrollbarStyle: "overlay",
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
		fixedGutter: true,
		showCursorWhenSelecting: true,
		scrollbarStyle: "overlay",
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

	let html_box = document.querySelector('.html-codearea');
	let html_editor = CodeMirror.fromTextArea(html_box, cm_opt_html);

	cm_opt_css.mode = 'css';
	let css_box = document.querySelector('.css-codearea');
	let css_editor = CodeMirror.fromTextArea(css_box, cm_opt_css);
	
	let inputWrappers = document.querySelectorAll('.taskInput:not(.--description)');
	html_editor.setSize("100%", "100%");
	css_editor.setSize("100%", "100%");

	function css_validator(cm, updateLinting, options) {
		let errors = CodeMirror.lint.css(cm);
		let onlyErrors = errors.filter(error => error.severity === 'error');
		let runbtns = document.querySelectorAll('.run-test-js')
		runbtns.forEach((runbtn) => {
			if(onlyErrors.length > 0) {
				runbtn.classList.add('validateErrorCSS');
			} else {
				if(runbtn.classList.contains('validateErrorCSS')) {
					runbtn.classList.remove('validateErrorCSS');
				}
			}
		})
		updateLinting(onlyErrors);
	}

	function html_validator(cm, updateLinting, options) {
		let errors = CodeMirror.lint.html(cm);
		let onlyErrors = errors.filter(error => error.severity === 'error');
		let runbtns = document.querySelectorAll('.run-test-js');
		runbtns.forEach((runbtn) => {
			if(onlyErrors.length > 0) {
				runbtn.classList.add('validateErrorHTML');
			} else {
				if(runbtn.classList.contains('validateErrorHTML')) {
					runbtn.classList.remove('validateErrorHTML');
				}
			}
		})
		updateLinting(errors);
	}

	const checkCorrectStyleLink = () => {
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
		// include css reset from http://meyerweb.com/eric/tools/css/reset/ (maybe better fetch from external file?)
		let cssReset = "" //"a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,let,video{margin:0;padding:0;border:0;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}*,:after,:before{-webkit-box-sizing:border-box;box-sizing:border-box}";
		css = '<style>' + cssReset + css + '</style>';
		src = src.replace('</head>', css + '</head>');
		return src;
	};
	
	const render = () => {
		let source = prepareSource();
		let iframe = document.querySelector('.output-iframe');
		let iframe_doc = iframe.contentDocument || iframe.contentWindow.document;
		
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

	css_editor.refresh();
	html_editor.refresh();

	return {
		getHTMLEditor:() => {
			return html_editor;
		},
		getCSSEditor:() => {
			return css_editor;
		}
	};
			
})();


//Toggle TaskDescription 
let setTaskDescription = (ele) => {
	saveCode().then(() => {
		console.log(ele)
		let taskinstancenumber = parseInt(ele.htmlFor);
		let parent = ele.parentNode;
		let inputs = document.querySelectorAll('.input-wrapper.--task');
		var index = Array.from(inputs).findIndex(input => input === parent);
		let taskDescriptions = document.querySelectorAll(`.description-scroll-wrapper:not([data-taskinstancenumber="${taskinstancenumber}"])`);
		taskDescriptions.forEach((taskDescription) => {
			taskDescription.classList.add('--not-active');
			console.log(taskDescription)
		})

		let activeTaskDescription = document.querySelector(`.description-scroll-wrapper[data-taskinstancenumber="${taskinstancenumber}"]`);
		activeTaskDescription.classList.remove('--not-active');
		let htmlEditor = editorRendering.getHTMLEditor();
		let cssEditor = editorRendering.getCSSEditor();
		let taskinstance = ele.parentNode.querySelector('.taskInput')
		let taskinstanceObj;
		fetch(`/admin/btn/taskinstance/${taskinstance.dataset.taskinstanceid}/get`, {
				method: 'GET'
			}).then((res) => {
				if (res.ok) return res.json()
			}).then((data) => {
				taskinstanceObj = data
				if(taskinstanceObj.taskinstance.htmlCode_user !== null || taskinstanceObj.taskinstance.htmlCode_user !== "") {
					htmlEditor.setValue(taskinstanceObj.taskinstance.htmlCode_user);
					
				} else {
					htmlEditor.setValue(taskinstanceObj.taskinstance.htmlCode_inital);
				}

				if(taskinstanceObj.taskinstance.cssCode_user !== null || taskinstanceObj.taskinstance.cssCode_user !== "") {
					cssEditor.setValue(taskinstanceObj.taskinstance.cssCode_user);
				} else {
					cssEditor.setValue(taskinstanceObj.taskinstance.cssCode_inital);
				}
			}).catch(function(error) {
				console.log(error)
	  });
 });   	

}

//Toggle Section Description
let setDescription = (ele) => {
	saveCode().then(() => {
		let descriptionWrapper = document.querySelector(`.description-scroll-wrapper[data-description="description"]`);
		let taskDescriptions = document.querySelectorAll(`.description-scroll-wrapper:not([data-description="description"])`);
		taskDescriptions.forEach((taskDescription) => {
			taskDescription.classList.add('--not-active');
		})
		descriptionWrapper.classList.remove('--not-active');
	});
}

//Reset User Code
let resetBtn = document.querySelector('.reset');
resetBtn.addEventListener('click', () => { resetCode(resetBtn) }, false);

let isClickedReset = false;
function resetCode(btn) {
	let taskinstance = document.querySelector('.taskInput.--task:checked');
	if(taskinstance !== null) {
		let parent = taskinstance.parentNode;
		let inputs = document.querySelectorAll('.input-wrapper.--task');
		var index = Array.from(inputs).findIndex(input => input === parent);
		let taskinstanceNumber = taskinstance.id;
		if (confirm('Möchten Sie wirklich Ihren Code auf den Start-Code zurücksetzten?')) {
			resetUserCodeM(taskinstance);
			let descriptionScrollWrapper = document.querySelector(`.description-scroll-wrapper[data-taskinstancenumber="${taskinstanceNumber}"]`);
			let tasks = descriptionScrollWrapper.querySelectorAll('.task');
			tasks.forEach((task, index) => {
				index > 0 ? task.classList.add('--not-solved') : "";
				let input = task.querySelector('.task-solved');
				input.classList.contains('--error') ? input.classList.remove('--error') : "";
				input.checked = false;
				updateTaskSolvedM(task.dataset.taskid, false);	
			})
			//Set HTML & CSS Editor to inital
			let htmlEditor = editorRendering.getHTMLEditor();
			let cssEditor = editorRendering.getCSSEditor();
			htmlEditor.setValue(section.taskinstance[index].htmlCode_inital);
			cssEditor.setValue(section.taskinstance[index].cssCode_inital);
		}
	} else {
		alert("Bitte wählen Sie eine Aufgabe aus um den Code zurückzusetzten");
	}
	avoidSpamM(btn, isClickedReset);
}

//Save Code on KeyDown cmd + s or ctrl + s
let keyfired = false;
document.addEventListener("keydown", function(e) {
  if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)  && e.keyCode == 83) {
    e.preventDefault();
    if (e.repeat) { return }
    if(!keyfired) {
    	keyfired = true;
    	saveCode("manuell");
    }
    
  }
}, false);

document.addEventListener("keyup", function(e) {
  if (e.keyCode == 83) {
    e.preventDefault();
    setTimeout(() => {
    	keyfired = false;
    }, 2000)
  }
}, false);

//Save code on button click
let updateBtn = document.querySelector('.save');
let isClickedSave = false;
updateBtn.addEventListener('click', () => {
	saveCode("manuell")
}, false)

function saveCode(value) {
	let html_editor = editorRendering.getHTMLEditor();
	let css_editor = editorRendering.getCSSEditor();
	let savedWrapper = document.querySelector('.code-saved-wrapper');
	let savedWrapperError = document.querySelector('.code-saved-wrapper.--error');
	let taskinstance = document.querySelector('.taskInput.--task:checked');
	if(taskinstance !== null) {
		saveCodeM(taskinstance, html_editor, css_editor);
		savedWrapper.classList.add('--saved');
		//Show and Hide Save wrapper
		setTimeout(() => {
			savedWrapper.classList.remove('--saved');
		}, 2000)
	} else if(taskinstance === null && value === "manuell") {
		savedWrapperError.classList.add('--saved');
		setTimeout(() => {
			savedWrapperError.classList.remove('--saved');
		}, 3000)

	}
	avoidSpamM(updateBtn, isClickedSave);
	return Promise.resolve()
}

//make Editors accessible for other files
export const getEditors = () => {
	return [editorRendering.getHTMLEditor(), editorRendering.getCSSEditor()];
}


window.setTaskDescription = setTaskDescription;
window.setDescription = setDescription;