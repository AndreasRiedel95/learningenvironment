import Quill from 'quill';

var quill = new Quill('#editor-container', {
  modules: {
    toolbar: {
	    container: [
	      [{ header: [1, 2, false] }],
	      ['bold', 'italic', 'underline'],
	      ['image', 'code-block', 'link']
	    ],
		handlers: {image: imageHandler},
	}
  },
  placeholder: 'Beschreibung',
  theme: 'snow'  // or 'bubble'
});

var form = document.querySelector('form');
form.onsubmit = function() {
	var description = document.querySelector('input[name=description]');
	console.log(quill.root.innerHTML)
	description.value = quill.root.innerHTML;
}

function imageHandler() {


    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    let fileName;

    input.onchange = function() {
      let file = input.files[0];
      fileName = file.name;
  	}

  	var range = this.quill.getSelection();
  	
  	this.quill.insertEmbed(range.index, 'image', `/img/${fileName}`, Quill.sources.USER);


}