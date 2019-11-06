var FileSaver = require('file-saver');
import {getEditors} from './index.js'

//on init set click event listeners 
(() => {
	document.querySelectorAll('.import-file').forEach((button) => {
		button.addEventListener('change', () => {
			let target = null;
			let editors = getEditors();
			if(button.classList.contains('--html-js')) {
				target = editors[0];
			} else {
				target = editors[1];
			}
			importFile(button, target);
		}, false)
	});

	// Set name for exported filename 
	document.querySelectorAll('.export-file').forEach((button) => {
		button.addEventListener('click', () => {
			let target = null;
			let fileName = '';
			let editors = getEditors();
			if(button.classList.contains('--html-js')) {
				target = editors[0]
				fileName = 'index.html';
			} else {
				target = editors[1]
				fileName = 'style.css';
			}
			exportFile(fileName, target)
		}, false)
	});
})();

export const importFile = (input, target) => { 
		if ('files' in input && input.files.length > 0) {
			placeFileContent(target, input.files[0])}

		function placeFileContent(target, file) {
			readFileContent(file).then(content => {
				target.setValue(content);
		}).catch(error => console.log(error))
		}

		function readFileContent(file) {
			const reader = new FileReader();
			return new Promise((resolve, reject) => {
				reader.onload = event => resolve(event.target.result);
				reader.onerror = error => reject(error);
				reader.readAsText(file);
		})
	}
};

export const exportFile = (fileName, target) => {
	var blob = new Blob([target.getValue()], {type: "text/plain;charset=utf-8"});
	FileSaver.saveAs(blob, fileName);
}

