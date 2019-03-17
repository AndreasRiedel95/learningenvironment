const getUserCode = (taskinstance) => {
	fetch(`/admin/btn/taskinstance/${taskinstance.dataset.taskinstanceid}/get`, {
		method: 'GET'
	}).then((res) => {
		if (res.ok) return res.json()
	}).then((data) => {
		returnData(data)
	}).catch((error) => {
		console.log(error)
	})
}

function returnData(data) {
	return data;
}

module.exports = getUserCode;