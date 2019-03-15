function searchList() {
	var input, filter, label, txtValue;
	input = document.querySelector('.searchbar');
	filter = input.value.toUpperCase();
	label = document.querySelectorAll('.list-value');


	// Loop through all list items, and hide those who don't match the search query
	for (i = 0; i < label.length; i++) {
		txtValue = label[i].innerHTML;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			label[i].parentNode.style.display = ""; 
		} else {
			label[i].parentNode.style.display = "none";
		}
		
	}
}

window.searchList = searchList;
