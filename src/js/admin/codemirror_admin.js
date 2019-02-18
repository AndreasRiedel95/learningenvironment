import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/mode/css/css.js';

let cm_opt_html = {
	mode: 'text/html',
	gutters: ['CodeMirror-lint-markers'],
	theme: 'lucario',
	indentWithTabs: true,
	showCursorWhenSelecting: true,
	fixedGutter: true,
	lineNumbers: true,
	autoCloseTags: false,
};

	let cm_opt_css = {
	mode: 'text/html',
	gutters: ['CodeMirror-lint-markers'],
	theme: 'lucario',
	indentWithTabs: true,
	fixedGutter: true,
	showCursorWhenSelecting: true,
	lineNumbers: true,
	autoCloseTags: true,
};

let html_box = document.querySelector('.html-codearea');
let html_editor = CodeMirror.fromTextArea(html_box, cm_opt_html);

cm_opt_css.mode = 'css';
let css_box = document.querySelector('.css-codearea');
let css_editor = CodeMirror.fromTextArea(css_box, cm_opt_css);


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