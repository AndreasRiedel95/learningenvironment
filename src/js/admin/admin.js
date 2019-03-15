function searchList() {
	var input, filter, label, txtValue;
	input = document.querySelector('.searchbar');
	filter = input.value.toUpperCase();
	label = document.querySelectorAll('.list-value');

	let lastLines = document.querySelectorAll('.--without-break')
	lastLines.forEach((lastline) => {
		lastline.classList.remove('--without-break')
	})

	// Loop through all list items, and hide those who don't match the search query
	for (i = 0; i < label.length; i++) {
		txtValue = label[i].innerHTML;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			label[i].parentNode.classList.remove('--not-in-query') 
		} else {
			label[i].parentNode.classList.add('--not-in-query') 
		}
		
		let inQuery = document.querySelectorAll('.checkbox-group:not(.--not-in-query)');
		if(inQuery !== null) {
			inQuery[inQuery.length - 1].classList.add('--without-break')
		}
	}
}

window.searchList = searchList;
