import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/addon/scroll/simplescrollbars.js';
import 'codemirror/mode/css/css.js';

let cm_opt_html = {
	mode: 'text/html',
	gutters: ['CodeMirror-lint-markers'],
	theme: 'lucario',
	indentWithTabs: true,
	showCursorWhenSelecting: true,
	fixedGutter: true,
	lineNumbers: true,
	autoCloseTags: false
};

	let cm_opt_css = {
	mode: 'text/html',
	gutters: ['CodeMirror-lint-markers'],
	theme: 'lucario',
	indentWithTabs: true,
	scrollbarStyle: "overlay",
	fixedGutter: true,
	showCursorWhenSelecting: true,
	lineNumbers: true,
	scrollbarStyle: "overlay",
	autoCloseTags: true,
};

let cm_opt_output = {
	mode: 'text/html',
	gutters: ['CodeMirror-lint-markers'],
	theme: 'lucario',
	fixedGutter: true,
	scrollbarStyle: "overlay",
	lineNumbers: true,
	readOnly: true,
	viewportMargin: Infinity
};





let html_box = document.querySelector('.html-codearea');
let html_editor, css_editor;
if(html_box.classList.contains('--output')) {
	html_editor = CodeMirror.fromTextArea(html_box, cm_opt_output);

} else {
	html_editor = CodeMirror.fromTextArea(html_box, cm_opt_html);	
}


cm_opt_css.mode = 'css';
let css_box = document.querySelector('.css-codearea');
if(css_box.classList.contains('--output')){
	cm_opt_output.mode = 'css';
	css_editor = CodeMirror.fromTextArea(css_box, cm_opt_output);

} else {
	css_editor = CodeMirror.fromTextArea(css_box, cm_opt_css);
}


html_editor.on("change", function(html_editor, change) {
	render(html_editor);
});
css_editor.on("change", function(css_editor, change) {
	render(css_editor);
});

function render(editor) {
	html_box.value = html_editor.getValue();
	css_box.value = css_editor.getValue();

}