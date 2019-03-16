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

function enableDragSort(listClass) {
  const sortableLists = document.getElementsByClassName(listClass);
  Array.prototype.map.call(sortableLists, (list) => {enableDragList(list)});
}

function enableDragList(list) {
  Array.prototype.map.call(list.children, (item) => {enableDragItem(item)});
}

function enableDragItem(item) {
  item.setAttribute('draggable', true)

  document.addEventListener('drag', function(event) {
  	handleDrag(event, item)
  }, false)
  document.addEventListener('dragend', function(event) {
  	handleDrop(event);	
  })
  
}

function handleDrag(item) {
  const selectedItem = item.target,
        list = selectedItem.parentNode,
        x = event.clientX,
        y = event.clientY;
  
  selectedItem.classList.add('drag-sort-active');
  let swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);
  
  if (list === swapItem.parentNode) {
    swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
    list.insertBefore(selectedItem, swapItem);
  }
}

function handleDrop(item) {
  item.target.classList.remove('drag-sort-active');
  setItemNumber(item);
}

function setItemNumber(item) {
	let list = item.target.parentNode;
	let listItems = list.querySelectorAll('.order-list-item');
	listItems.forEach((listItem, i) => {
		listItem.querySelector('.object-number').innerHTML = i + 1;
		saveNumberToDataBase(listItem, (i+1))
	})
	saveOrderToDataBase(listItems)
}


function saveNumberToDataBase(item, position) {
	let itemId = item.dataset.listitemid;
	let parentCls = item.parentNode.classList
		let fetchURL = null
		switch(true) {
			case parentCls.contains('--section'):
				fetchURL = `/admin/btn/taskinstance/order/${itemId}/update`
				break;
			case parentCls.contains('--taskinstance'):
				fetchURL = `/admin/btn/task/order/${itemId}/update`
				break;
			case parentCls.contains('--sectioninstance'):
				fetchURL = `/admin/btn/section/order/${itemId}/update`
				break;
			default:
				fetchURL = ""
				break;
		}

		fetch(fetchURL, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			'id' : itemId, 
			'position': position
		})
	})
	.then(response => response.json())
	.catch(error => console.error('Error:', error))
	.then(response => console.log('Success:', JSON.stringify(response)));
}

function saveOrderToDataBase(listItems) {
	let list = listItems[0].parentNode;
	console.log(list)
	let parentCls = listItems[0].parentNode.classList
	let fetchURL = "";
	listitemObj = Array.from(listItems).map((listItem) => ({_id: listItem.dataset.listitemid}));
	let listId = list.dataset.listid;
	console.log(listId)
	switch(true) {
		case parentCls.contains('--section'):
			fetchURL = `/admin/btn/section/taskinstance/order/${listId}/update`
			break;
		case parentCls.contains('--taskinstance'):
			fetchURL = `/admin/btn/taskinstance/task/order/${listId}/update`
			break;
		case parentCls.contains('--sectioninstance'):
			fetchURL = `/admin/btn/sectioninstance/section/order/${listId}/update`
			break;
		default:
			fetchURL = ""
			break;
	}
	console.log(listitemObj)
	fetch(fetchURL, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			'id' : listId, 
			'objects': listitemObj
		})
	})
	.then(response => response.json())
	.catch(error => console.error('Error:', error))
	.then(response => console.log('Success:', JSON.stringify(response)));



}


(()=> {enableDragSort('drag-sort-enable')})();

window.searchList = searchList;
