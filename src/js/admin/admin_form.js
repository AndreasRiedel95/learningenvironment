function searchList() {
	var input, filter, label, txtValue;
	input = document.querySelector('.searchbar');
	filter = input.value.toUpperCase();
	label = document.querySelectorAll('.list-value');

	let lastLines = document.querySelectorAll('.--without-break')
	if(lastLines !== null) {
		lastLines.forEach((lastline) => {
			lastline.classList.remove('--without-break')
		})
	}

	// Loop through all list items, and hide those who don't match the search query
	for (i = 0; i < label.length; i++) {
		txtValue = label[i].innerHTML;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			console.log("iiin")
			label[i].parentNode.classList.remove('--not-in-query') 
		} else {
			label[i].parentNode.classList.add('--not-in-query') 
		}
		
		let inQuery = document.querySelectorAll('.checkbox-group:not(.--not-in-query)');
		if(inQuery.length > 0 && inQuery !== null) {
			inQuery[inQuery.length - 1].classList.add('--without-break')
		}
	}
}

function displayObject(e) {
	let ul = document.querySelector('.selectedObjectsList');
	let contentId = e.id
	if(e.checked) {
		let contentObject = e.parentNode.querySelector('.list-value');
		let content = contentObject.innerHTML;
		var li = document.createElement("li");
		li.appendChild(document.createTextNode(content));
		li.setAttribute('data-objectid', contentId)
		li.setAttribute("class", 'selectedObject');
		ul.appendChild(li);
	} else {
		let eleRemove = ul.querySelector(`.selectedObject[data-objectid="${contentId}"]`)
		eleRemove.remove();


	}
}

(() => {
	let checks = document.querySelectorAll('.objectCheckbox')
	checks.forEach((checkbox) => {
		if(checkbox !== null && checkbox.checked) {
			displayObject(checkbox)	
		}
		
	})
})();

window.searchList = searchList;
window.displayObject = displayObject;