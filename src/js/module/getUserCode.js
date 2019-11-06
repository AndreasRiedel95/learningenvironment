const getUserCode = (taskinstance) => {
	fetch(`/admin/btn/taskinstance/${taskinstance.dataset.taskinstanceid}/get`, {
		method: 'GET'
	}).then((res) => {
		if (res.ok) return res.json()
	}).then((data) => {
		return data;
	}).catch((error) => {
		console.log(error)
	})
}

module.exports = getUserCode;