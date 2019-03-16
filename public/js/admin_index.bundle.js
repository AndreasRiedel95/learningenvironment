/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/admin/admin_index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/admin/admin_index.js":
/*!*************************************!*\
  !*** ./src/js/admin/admin_index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function searchList() {
  var input, filter, label, txtValue;
  input = document.querySelector('.searchbar');
  filter = input.value.toUpperCase();
  label = document.querySelectorAll('.list-value');
  var lastLines = document.querySelectorAll('.--without-break');
  lastLines.forEach(function (lastline) {
    lastline.classList.remove('--without-break');
  }); // Loop through all list items, and hide those who don't match the search query

  for (i = 0; i < label.length; i++) {
    txtValue = label[i].innerHTML;

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      label[i].parentNode.classList.remove('--not-in-query');
    } else {
      label[i].parentNode.classList.add('--not-in-query');
    }

    var inQuery = document.querySelectorAll('.checkbox-group:not(.--not-in-query)');

    if (inQuery !== null) {
      inQuery[inQuery.length - 1].classList.add('--without-break');
    }
  }
} //variables needed for firefox 


var x = 0,
    y = 0;

function enableDragSort(listClass) {
  var sortableLists = document.getElementsByClassName(listClass);
  Array.prototype.map.call(sortableLists, function (list) {
    enableDragList(list);
  });
}

function enableDragList(list) {
  Array.prototype.map.call(list.children, function (item) {
    enableDragItem(item);
  });
}

function enableDragItem(item) {
  item.setAttribute('draggable', true);
  document.addEventListener('dragstart', function (event) {
    event.dataTransfer.setData('application/node type', this);

    document.ondragover = function (event) {
      event = event || window.event;
      x = event.clientX, y = event.clientY;
    };
  }, false);
  document.addEventListener('drag', function (event) {
    handleDrag(item, event);
  }, false);
  document.addEventListener('dragend', function (event) {
    handleDrop(event);
  });
}

function handleDrag(item, event) {
  var selectedItem = event.target,
      list = selectedItem.parentNode;
  selectedItem.classList.add('drag-sort-active');
  var swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);

  if (list === swapItem.parentNode) {
    swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
    list.insertBefore(selectedItem, swapItem);
  }
}

function handleDrop(event) {
  event.target.classList.remove('drag-sort-active');
  setItemNumber(event);
}

function setItemNumber(item) {
  var list = item.target.parentNode;
  var listItems = list.querySelectorAll('.order-list-item');
  listItems.forEach(function (listItem, i) {
    listItem.querySelector('.object-number').innerHTML = i + 1;
    saveNumberToDataBase(listItem, i + 1);
  });
  saveOrderToDataBase(listItems);
}

function saveNumberToDataBase(item, position) {
  var itemId = item.dataset.listitemid;
  var parentCls = item.parentNode.classList;
  var fetchURL = null;

  switch (true) {
    case parentCls.contains('--section'):
      fetchURL = "/admin/btn/taskinstance/order/".concat(itemId, "/update");
      break;

    case parentCls.contains('--taskinstance'):
      fetchURL = "/admin/btn/task/order/".concat(itemId, "/update");
      break;

    case parentCls.contains('--sectioninstance'):
      fetchURL = "/admin/btn/section/order/".concat(itemId, "/update");
      break;

    default:
      fetchURL = "";
      break;
  }

  fetch(fetchURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'id': itemId,
      'position': position
    })
  }).then(function (response) {
    return response.json();
  }).catch(function (error) {
    return console.error('Error:', error);
  }).then(function (response) {
    return console.log('Success:', JSON.stringify(response));
  });
}

function saveOrderToDataBase(listItems) {
  var list = listItems[0].parentNode;
  var parentCls = listItems[0].parentNode.classList;
  var fetchURL = "";
  listitemObj = Array.from(listItems).map(function (listItem) {
    return {
      _id: listItem.dataset.listitemid
    };
  });
  var listId = list.dataset.listid;

  switch (true) {
    case parentCls.contains('--section'):
      fetchURL = "/admin/btn/section/taskinstance/order/".concat(listId, "/update");
      break;

    case parentCls.contains('--taskinstance'):
      fetchURL = "/admin/btn/taskinstance/task/order/".concat(listId, "/update");
      break;

    case parentCls.contains('--sectioninstance'):
      fetchURL = "/admin/btn/sectioninstance/section/order/".concat(listId, "/update");
      break;

    default:
      fetchURL = "";
      break;
  }

  console.log(listitemObj);
  fetch(fetchURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'id': listId,
      'objects': listitemObj
    })
  }).then(function (response) {
    return response.json();
  }).catch(function (error) {
    return console.error('Error:', error);
  }).then(function (response) {
    return console.log('Success:', JSON.stringify(response));
  });
}

(function () {
  enableDragSort('drag-sort-enable');
})();

window.searchList = searchList;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FkbWluL2FkbWluX2luZGV4LmpzIl0sIm5hbWVzIjpbInNlYXJjaExpc3QiLCJpbnB1dCIsImZpbHRlciIsImxhYmVsIiwidHh0VmFsdWUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ2YWx1ZSIsInRvVXBwZXJDYXNlIiwicXVlcnlTZWxlY3RvckFsbCIsImxhc3RMaW5lcyIsImZvckVhY2giLCJsYXN0bGluZSIsImNsYXNzTGlzdCIsInJlbW92ZSIsImkiLCJsZW5ndGgiLCJpbm5lckhUTUwiLCJpbmRleE9mIiwicGFyZW50Tm9kZSIsImFkZCIsImluUXVlcnkiLCJ4IiwieSIsImVuYWJsZURyYWdTb3J0IiwibGlzdENsYXNzIiwic29ydGFibGVMaXN0cyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJBcnJheSIsInByb3RvdHlwZSIsIm1hcCIsImNhbGwiLCJsaXN0IiwiZW5hYmxlRHJhZ0xpc3QiLCJjaGlsZHJlbiIsIml0ZW0iLCJlbmFibGVEcmFnSXRlbSIsInNldEF0dHJpYnV0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImRhdGFUcmFuc2ZlciIsInNldERhdGEiLCJvbmRyYWdvdmVyIiwid2luZG93IiwiY2xpZW50WCIsImNsaWVudFkiLCJoYW5kbGVEcmFnIiwiaGFuZGxlRHJvcCIsInNlbGVjdGVkSXRlbSIsInRhcmdldCIsInN3YXBJdGVtIiwiZWxlbWVudEZyb21Qb2ludCIsIm5leHRTaWJsaW5nIiwiaW5zZXJ0QmVmb3JlIiwic2V0SXRlbU51bWJlciIsImxpc3RJdGVtcyIsImxpc3RJdGVtIiwic2F2ZU51bWJlclRvRGF0YUJhc2UiLCJzYXZlT3JkZXJUb0RhdGFCYXNlIiwicG9zaXRpb24iLCJpdGVtSWQiLCJkYXRhc2V0IiwibGlzdGl0ZW1pZCIsInBhcmVudENscyIsImZldGNoVVJMIiwiY29udGFpbnMiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJjYXRjaCIsImVycm9yIiwiY29uc29sZSIsImxvZyIsImxpc3RpdGVtT2JqIiwiZnJvbSIsIl9pZCIsImxpc3RJZCIsImxpc3RpZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLFNBQVNBLFVBQVQsR0FBc0I7QUFDckIsTUFBSUMsS0FBSixFQUFXQyxNQUFYLEVBQW1CQyxLQUFuQixFQUEwQkMsUUFBMUI7QUFDQUgsT0FBSyxHQUFHSSxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBUjtBQUNBSixRQUFNLEdBQUdELEtBQUssQ0FBQ00sS0FBTixDQUFZQyxXQUFaLEVBQVQ7QUFDQUwsT0FBSyxHQUFHRSxRQUFRLENBQUNJLGdCQUFULENBQTBCLGFBQTFCLENBQVI7QUFFQSxNQUFJQyxTQUFTLEdBQUdMLFFB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Q0E7QUFaRjs7QUFjQWEsU0FBTyxDQUFDQyxHQUFSLENBQVlDLFdBQVo7QUFDQWIsT0FBSyxDQUFDRixRQUFELEVBQVc7QUFDZkcsVUFBTSxFQUFFLE1BRE87QUFFZkMsV0FBTyxFQUFFO0FBQUMsc0JBQWdCO0FBQWpCLEtBRk07QUFHZkMsUUFBSSxFQUFFQyxJQUFJLENBQUNDLFNBQUwsQ0FBZTtBQUNwQixZQUFPVyxNQURhO0FBRXBCLGlCQUFXSDtBQUZTLEtBQWY7QUFIUyxHQUFYLENBQUwsQ0FRQ1AsSUFSRCxDQVFNLFVBQUFDLFFBQVE7QUFBQSxXQUFJQSxRQUFRLENBQUNDLElBQVQsRUFBSjtBQUFBLEdBUmQsRUFTQ0MsS0FURCxDQVNPLFVBQUFDLEtBQUs7QUFBQSxXQUFJQyxPQUFPLENBQUNELEtBQVIsQ0FBYyxRQUFkLEVBQXdCQSxLQUF4QixDQUFKO0FBQUEsR0FUWixFQVVDSixJQVZELENBVU0sVUFBQUMsUUFBUTtBQUFBLFdBQUlJLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFVBQVosRUFBd0JSLElBQUksQ0FBQ0MsU0FBTCxDQUFlRSxRQUFmLENBQXhCLENBQUo7QUFBQSxHQVZkO0FBY0E7O0FBR0QsQ0FBQyxZQUFLO0FBQUNqRCxnQkFBYyxDQUFDLGtCQUFELENBQWQ7QUFBbUMsQ0FBMUM7O0FBRUFtQixNQUFNLENBQUMzQyxVQUFQLEdBQW9CQSxVQUFwQixDIiwiZmlsZSI6ImFkbWluX2luZGV4LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL2FkbWluL2FkbWluX2luZGV4LmpzXCIpO1xuIiwiZnVuY3Rpb24gc2VhcmNoTGlzdCgpIHtcblx0dmFyIGlucHV0LCBmaWx0ZXIsIGxhYmVsLCB0eHRWYWx1ZTtcblx0aW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoYmFyJyk7XG5cdGZpbHRlciA9IGlucHV0LnZhbHVlLnRvVXBwZXJDYXNlKCk7XG5cdGxhYmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpc3QtdmFsdWUnKTtcblxuXHRsZXQgbGFzdExpbmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLi0td2l0aG91dC1icmVhaycpXG5cdGxhc3RMaW5lcy5mb3JFYWNoKChsYXN0bGluZSkgPT4ge1xuXHRcdGxhc3RsaW5lLmNsYXNzTGlzdC5yZW1vdmUoJy0td2l0aG91dC1icmVhaycpXG5cdH0pXG5cblx0Ly8gTG9vcCB0aHJvdWdoIGFsbCBsaXN0IGl0ZW1zLCBhbmQgaGlkZSB0aG9zZSB3aG8gZG9uJ3QgbWF0Y2ggdGhlIHNlYXJjaCBxdWVyeVxuXHRmb3IgKGkgPSAwOyBpIDwgbGFiZWwubGVuZ3RoOyBpKyspIHtcblx0XHR0eHRWYWx1ZSA9IGxhYmVsW2ldLmlubmVySFRNTDtcblx0XHRpZiAodHh0VmFsdWUudG9VcHBlckNhc2UoKS5pbmRleE9mKGZpbHRlcikgPiAtMSkge1xuXHRcdFx0bGFiZWxbaV0ucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCctLW5vdC1pbi1xdWVyeScpIFxuXHRcdH0gZWxzZSB7XG5cdFx0XHRsYWJlbFtpXS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJy0tbm90LWluLXF1ZXJ5JykgXG5cdFx0fVxuXHRcdFxuXHRcdGxldCBpblF1ZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNoZWNrYm94LWdyb3VwOm5vdCguLS1ub3QtaW4tcXVlcnkpJyk7XG5cdFx0aWYoaW5RdWVyeSAhPT0gbnVsbCkge1xuXHRcdFx0aW5RdWVyeVtpblF1ZXJ5Lmxlbmd0aCAtIDFdLmNsYXNzTGlzdC5hZGQoJy0td2l0aG91dC1icmVhaycpXG5cdFx0fVxuXHR9XG59XG5cbi8vdmFyaWFibGVzIG5lZWRlZCBmb3IgZmlyZWZveCBcbnZhciB4ID0gMCxcbiAgICB5ID0gMDtcblxuXG5mdW5jdGlvbiBlbmFibGVEcmFnU29ydChsaXN0Q2xhc3MpIHtcbiAgY29uc3Qgc29ydGFibGVMaXN0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUobGlzdENsYXNzKTtcbiAgQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKHNvcnRhYmxlTGlzdHMsIChsaXN0KSA9PiB7ZW5hYmxlRHJhZ0xpc3QobGlzdCl9KTtcbn1cblxuZnVuY3Rpb24gZW5hYmxlRHJhZ0xpc3QobGlzdCkge1xuICBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwobGlzdC5jaGlsZHJlbiwgKGl0ZW0pID0+IHtlbmFibGVEcmFnSXRlbShpdGVtKX0pO1xufVxuXG5mdW5jdGlvbiBlbmFibGVEcmFnSXRlbShpdGVtKSB7XG4gIGl0ZW0uc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCB0cnVlKVxuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIFx0ZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ2FwcGxpY2F0aW9uL25vZGUgdHlwZScsIHRoaXMpO1xuICAgIGRvY3VtZW50Lm9uZHJhZ292ZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudCA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcbiAgICAgICAgeCA9IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIHkgPSBldmVudC5jbGllbnRZO1xuICAgIH07XG4gIH0sIGZhbHNlKVxuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWcnLCBmdW5jdGlvbihldmVudCkge1xuICBcdGhhbmRsZURyYWcoaXRlbSwgZXZlbnQpXG4gIH0sIGZhbHNlKVxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgXHRoYW5kbGVEcm9wKGV2ZW50KTtcdFxuICB9KVxuICBcbn1cblxuXG5mdW5jdGlvbiBoYW5kbGVEcmFnKGl0ZW0sIGV2ZW50KSB7XG4gIGNvbnN0IHNlbGVjdGVkSXRlbSA9IGV2ZW50LnRhcmdldCxcbiAgICAgICAgbGlzdCA9IHNlbGVjdGVkSXRlbS5wYXJlbnROb2RlO1xuICBzZWxlY3RlZEl0ZW0uY2xhc3NMaXN0LmFkZCgnZHJhZy1zb3J0LWFjdGl2ZScpO1xuXG4gIGxldCBzd2FwSXRlbSA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoeCwgeSkgPT09IG51bGwgPyBzZWxlY3RlZEl0ZW0gOiBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KHgsIHkpO1xuICBcbiAgaWYgKGxpc3QgPT09IHN3YXBJdGVtLnBhcmVudE5vZGUpIHtcbiAgICBzd2FwSXRlbSA9IHN3YXBJdGVtICE9PSBzZWxlY3RlZEl0ZW0ubmV4dFNpYmxpbmcgPyBzd2FwSXRlbSA6IHN3YXBJdGVtLm5leHRTaWJsaW5nO1xuICAgIGxpc3QuaW5zZXJ0QmVmb3JlKHNlbGVjdGVkSXRlbSwgc3dhcEl0ZW0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURyb3AoZXZlbnQpIHtcbiAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWctc29ydC1hY3RpdmUnKTtcbiAgc2V0SXRlbU51bWJlcihldmVudCk7XG59XG5cbmZ1bmN0aW9uIHNldEl0ZW1OdW1iZXIoaXRlbSkge1xuXHRsZXQgbGlzdCA9IGl0ZW0udGFyZ2V0LnBhcmVudE5vZGU7XG5cdGxldCBsaXN0SXRlbXMgPSBsaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcmRlci1saXN0LWl0ZW0nKTtcblx0bGlzdEl0ZW1zLmZvckVhY2goKGxpc3RJdGVtLCBpKSA9PiB7XG5cdFx0bGlzdEl0ZW0ucXVlcnlTZWxlY3RvcignLm9iamVjdC1udW1iZXInKS5pbm5lckhUTUwgPSBpICsgMTtcblx0XHRzYXZlTnVtYmVyVG9EYXRhQmFzZShsaXN0SXRlbSwgKGkrMSkpXG5cdH0pXG5cdHNhdmVPcmRlclRvRGF0YUJhc2UobGlzdEl0ZW1zKVxufVxuXG5cbmZ1bmN0aW9uIHNhdmVOdW1iZXJUb0RhdGFCYXNlKGl0ZW0sIHBvc2l0aW9uKSB7XG5cdGxldCBpdGVtSWQgPSBpdGVtLmRhdGFzZXQubGlzdGl0ZW1pZDtcblx0bGV0IHBhcmVudENscyA9IGl0ZW0ucGFyZW50Tm9kZS5jbGFzc0xpc3Rcblx0XHRsZXQgZmV0Y2hVUkwgPSBudWxsXG5cdFx0c3dpdGNoKHRydWUpIHtcblx0XHRcdGNhc2UgcGFyZW50Q2xzLmNvbnRhaW5zKCctLXNlY3Rpb24nKTpcblx0XHRcdFx0ZmV0Y2hVUkwgPSBgL2FkbWluL2J0bi90YXNraW5zdGFuY2Uvb3JkZXIvJHtpdGVtSWR9L3VwZGF0ZWBcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIHBhcmVudENscy5jb250YWlucygnLS10YXNraW5zdGFuY2UnKTpcblx0XHRcdFx0ZmV0Y2hVUkwgPSBgL2FkbWluL2J0bi90YXNrL29yZGVyLyR7aXRlbUlkfS91cGRhdGVgXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBwYXJlbnRDbHMuY29udGFpbnMoJy0tc2VjdGlvbmluc3RhbmNlJyk6XG5cdFx0XHRcdGZldGNoVVJMID0gYC9hZG1pbi9idG4vc2VjdGlvbi9vcmRlci8ke2l0ZW1JZH0vdXBkYXRlYFxuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGZldGNoVVJMID0gXCJcIlxuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHRmZXRjaChmZXRjaFVSTCwge1xuXHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcblx0XHRib2R5OiBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHQnaWQnIDogaXRlbUlkLCBcblx0XHRcdCdwb3NpdGlvbic6IHBvc2l0aW9uXG5cdFx0fSlcblx0fSlcblx0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuXHQuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcignRXJyb3I6JywgZXJyb3IpKVxuXHQudGhlbihyZXNwb25zZSA9PiBjb25zb2xlLmxvZygnU3VjY2VzczonLCBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpKTtcbn1cblxuZnVuY3Rpb24gc2F2ZU9yZGVyVG9EYXRhQmFzZShsaXN0SXRlbXMpIHtcblx0bGV0IGxpc3QgPSBsaXN0SXRlbXNbMF0ucGFyZW50Tm9kZTtcblx0bGV0IHBhcmVudENscyA9IGxpc3RJdGVtc1swXS5wYXJlbnROb2RlLmNsYXNzTGlzdFxuXHRsZXQgZmV0Y2hVUkwgPSBcIlwiO1xuXHRsaXN0aXRlbU9iaiA9IEFycmF5LmZyb20obGlzdEl0ZW1zKS5tYXAoKGxpc3RJdGVtKSA9PiAoe19pZDogbGlzdEl0ZW0uZGF0YXNldC5saXN0aXRlbWlkfSkpO1xuXHRsZXQgbGlzdElkID0gbGlzdC5kYXRhc2V0Lmxpc3RpZDtcblx0c3dpdGNoKHRydWUpIHtcblx0XHRjYXNlIHBhcmVudENscy5jb250YWlucygnLS1zZWN0aW9uJyk6XG5cdFx0XHRmZXRjaFVSTCA9IGAvYWRtaW4vYnRuL3NlY3Rpb24vdGFza2luc3RhbmNlL29yZGVyLyR7bGlzdElkfS91cGRhdGVgXG5cdFx0XHRicmVhaztcblx0XHRjYXNlIHBhcmVudENscy5jb250YWlucygnLS10YXNraW5zdGFuY2UnKTpcblx0XHRcdGZldGNoVVJMID0gYC9hZG1pbi9idG4vdGFza2luc3RhbmNlL3Rhc2svb3JkZXIvJHtsaXN0SWR9L3VwZGF0ZWBcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgcGFyZW50Q2xzLmNvbnRhaW5zKCctLXNlY3Rpb25pbnN0YW5jZScpOlxuXHRcdFx0ZmV0Y2hVUkwgPSBgL2FkbWluL2J0bi9zZWN0aW9uaW5zdGFuY2Uvc2VjdGlvbi9vcmRlci8ke2xpc3RJZH0vdXBkYXRlYFxuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdGZldGNoVVJMID0gXCJcIlxuXHRcdFx0YnJlYWs7XG5cdH1cblx0Y29uc29sZS5sb2cobGlzdGl0ZW1PYmopXG5cdGZldGNoKGZldGNoVVJMLCB7XG5cdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0aGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxuXHRcdGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdCdpZCcgOiBsaXN0SWQsIFxuXHRcdFx0J29iamVjdHMnOiBsaXN0aXRlbU9ialxuXHRcdH0pXG5cdH0pXG5cdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcblx0LmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoJ0Vycm9yOicsIGVycm9yKSlcblx0LnRoZW4ocmVzcG9uc2UgPT4gY29uc29sZS5sb2coJ1N1Y2Nlc3M6JywgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKSk7XG5cblxuXG59XG5cblxuKCgpPT4ge2VuYWJsZURyYWdTb3J0KCdkcmFnLXNvcnQtZW5hYmxlJyl9KSgpO1xuXG53aW5kb3cuc2VhcmNoTGlzdCA9IHNlYXJjaExpc3Q7XG4iXSwic291cmNlUm9vdCI6IiJ9