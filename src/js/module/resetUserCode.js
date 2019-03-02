const resetUserCode = (taskinstance, html_editor, css_editor) => {
	fetch(`/admin/btn/taskinstance/${taskinstance.dataset.taskinstanceid}/update`, {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			'id' : taskinstance.dataset.taskinstanceid,
			'htmlCode_user': null,
			'cssCode_user': null,
		})
	})
}
module.exports = resetUserCode;