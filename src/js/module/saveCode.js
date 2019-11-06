const saveCode = (taskinstance, html_editor, css_editor) => {
	fetch(`/admin/btn/taskinstance/${taskinstance.dataset.taskinstanceid}/update`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			'id' : taskinstance.dataset.taskinstanceid,
			'htmlCode_user': html_editor.getValue(),
			'cssCode_user': css_editor.getValue(),
		})
	})
	.then(response => response.json())
	.then(response => console.log('Success:', JSON.stringify(response)))
	.catch(error => console.error('Error:', error));
}

module.exports = saveCode;