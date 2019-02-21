import Quill from 'quill';
//For enabling async await
require("babel-polyfill"); 


var quill = new Quill('#editor-container', {
  modules: {
    toolbar: {
	    container: [
	      [{ header: [1, 2, 3, false] }],
	      ['bold', 'italic', 'underline'],
	      ['image', 'code-block', 'link'],
	      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
	    ],
		handlers: {image: imageHandler},
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

function imageHandler() {
    const input = document.createElement('input');
    var reader = new FileReader();
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    let fileName;

	input.onchange = async function() {
		const file = input.files[0];
		console.log(file)
		const fileName = await file.name; 
		var range = this.quill.getSelection();	
	  	this.quill.insertEmbed(range.index, 'image', `/img/${fileName}`, Quill.sources.USER);
	}.bind(this); 

}