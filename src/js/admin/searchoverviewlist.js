function searchList() {
	var input, filter, value, txtValue;
	input = document.querySelector('.searchbar');
	filter = input.value.toUpperCase();
	value = document.querySelectorAll('.object-value');

	// Loop through all list items, and hide those who don't match the search query
	for (i = 0; i < value.length; i++) {
		txtValue = value[i].innerHTML;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			value[i].parentNode.parentNode.classList.remove('--not-in-query') 
		} else {
			value[i].parentNode.parentNode.classList.add('--not-in-query') 
		}
	}
}

window.searchList = searchList;