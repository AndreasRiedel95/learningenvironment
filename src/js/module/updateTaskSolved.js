const updateTaskSolved = (taskid, boolean) => {
	fetch(`/admin/solved/task/${taskid}/update`, {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			'id' : taskid,
			'task_solved': boolean
		})
	}).then((response) => {
		response.json()
		console.log("hhhh")
	})
	.catch((err) => {
		console.log(err)
	})
}

module.exports = updateTaskSolved;