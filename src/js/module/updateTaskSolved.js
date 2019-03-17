const updateTaskSolved = (taskid, boolean) => {
	fetch(`/admin/solved/task/${taskid}/update`, {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			'id' : taskid,
			'task_solved': boolean
		})
	})
	.then(response => response.json())
	.catch(error => console.error('Error:', error))
	.then(response => console.log('Success:', JSON.stringify(response)));
}

module.exports = updateTaskSolved;