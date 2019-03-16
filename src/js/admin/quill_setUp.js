import Quill from 'quill';
//For enabling async await
require("babel-polyfill"); 


var quill = new Quill('#editor-container', {
  modules: {
    toolbar: {
	    container: [
	      [{ header: [1, 2, 3, false] }],
	      ['bold', 'italic', 'underline'],
	      ['image', 'code', 'link'],
	      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
	      ['code-block']
	    ],
		handlers: {image: selectLocalImage},
	}
  },
  bounds: '.scrolling-container',
  scrollingContainer: '.scrolling-container', 
  placeholder: 'Beschreibung',
  theme: 'snow'
});

var form = document.querySelector('form');
form.onsubmit = function() {
	var description = document.querySelector('input[name=description]');
	console.log(quill.root.innerHTML)
	description.value = quill.root.innerHTML;
}

function selectLocalImage() {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();
	input.onchange = () => {
		const file = input.files[0];
		if (/^image\//.test(file.type)) {
	  		imageHandler(file, insertToEditor);
		} else {
	  		console.warn('You could only upload images.');
	  		alert('Bitte wählen Sie ein Bild vom Typ .jpg oder .png aus')
		}
	}
}

function imageHandler(image, callback) {
	var data = new FormData();
	data.append('image', image);
	fetch('https://api.imgur.com/3/image', {
		method: 'POST',
		headers: {
			Authorization: 'Client-ID 90ef1830bd083ba',
		},
		body: data
	}).then(response => {
		return response.json()
	}).then(data => {
		insertToEditor(data.data.link)
	}).catch(error => {
		console.error(JSON.stringify(error));
		alert('Upload failed: ' + error);
	});
}

function insertToEditor(url) {
	console.log("utl", url)
	const range = quill.getSelection();
	quill.insertEmbed(range.index, 'image', url);
}
