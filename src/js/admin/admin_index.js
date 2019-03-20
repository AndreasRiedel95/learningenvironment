//variables needed for firefox 
var x = 0,
    y = 0;


function enableDragSort(listClass) {
  const sortableLists = document.getElementsByClassName(listClass);
  Array.prototype.map.call(sortableLists, (list) => {enableDragList(list)});
}

function enableDragList(list) {
  Array.prototype.map.call(list.children, (item) => {enableDragItem(item)});
}

function enableDragItem(item) {
  item.setAttribute('draggable', true)

  document.addEventListener('dragstart', function(event) {
  	event.dataTransfer.setData('application/node type', this);
    document.ondragover = function(event) {
        event = event || window.event;
        x = event.clientX,
        y = event.clientY;
    };
  }, false)

  document.addEventListener('drag', function(event) {
  	handleDrag(event)
  }, false)
  document.addEventListener('dragend', function(event) {
  	handleDrop(event);	
  })
  
}


function handleDrag(event) {
  const selectedItem = event.target,
        list = selectedItem.parentNode;
  selectedItem.classList.add('drag-sort-active');

  let swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);
  
  if (list === swapItem.parentNode) {
    swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
    list.insertBefore(selectedItem, swapItem);
  }
}

function handleDrop(event) {
  event.target.classList.remove('drag-sort-active');
  let list = event.target.parentNode
  setItemNumber(list);
}

function setItemNumber(list) {
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
	let parentCls = listItems[0].parentNode.classList
	let fetchURL = "";
	listitemObj = Array.from(listItems).map((listItem) => ({_id: listItem.dataset.listitemid}));
	let listId = list.dataset.listid;
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


(() => {setItemNumber(document.querySelector('.order-list'))})();
(()=> {enableDragSort('drag-sort-enable')})();