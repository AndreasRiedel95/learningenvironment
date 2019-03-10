const getUserCode = (taskinstance) => {
	console.log("jaaa")
	fetch(`/admin/btn/taskinstance/${taskinstance.dataset.taskinstanceid}/get`, {
		method: 'GET'
	}).then((res) => {
		if (res.ok) return res.json()
	}).then((data) => {
		returnData(data)
	})	
}


function returnData(data) {
	return data;
}
module.exports = getUserCode;