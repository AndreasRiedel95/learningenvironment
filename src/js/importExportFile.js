var FileSaver = require('file-saver');

export const importFile = (input, target) => { 
		if ('files' in input && input.files.length > 0) {
			placeFileContent(target, input.files[0])}

		function placeFileContent(target, file) {
			readFileContent(file).then(content => {
				target.setValue(content);
		}).catch(error => console.log(error))
		}

		function readFileContent(file) {
			const reader = new FileReader()
			return new Promise((resolve, reject) => {
				reader.onload = event => resolve(event.target.result)
				reader.onerror = error => reject(error)
				reader.readAsText(file)
		})
	}
};

export const exportFile = (fileName, target) => {
	var blob = new Blob([target.getValue()], {type: "text/plain;charset=utf-8"});
	FileSaver.saveAs(blob, fileName);
}

