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
}

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
  document.addEventListener('drag', function (event) {
    handleDrag(event, item);
  }, false);
  document.addEventListener('dragend', function (event) {
    handleDrop(event);
  });
}

function handleDrag(item) {
  var selectedItem = item.target,
      list = selectedItem.parentNode,
      x = event.clientX,
      y = event.clientY;
  selectedItem.classList.add('drag-sort-active');
  var swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);

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
  console.log(list);
  var parentCls = listItems[0].parentNode.classList;
  var fetchURL = "";
  listitemObj = Array.from(listItems).map(function (listItem) {
    return {
      _id: listItem.dataset.listitemid
    };
  });
  var listId = list.dataset.listid;
  console.log(listId);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FkbWluL2FkbWluX2luZGV4LmpzIl0sIm5hbWVzIjpbInNlYXJjaExpc3QiLCJpbnB1dCIsImZpbHRlciIsImxhYmVsIiwidHh0VmFsdWUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ2YWx1ZSIsInRvVXBwZXJDYXNlIiwicXVlcnlTZWxlY3RvckFsbCIsImxhc3RMaW5lcyIsImZvckVhY2giLCJsYXN0bGluZSIsImNsYXNzTGlzdCIsInJlbW92ZSIsImkiLCJsZW5ndGgiLCJpbm5lckhUTUwiLCJpbmRleE9mIiwicGFyZW50Tm9kZSIsImFkZCIsImluUXVlcnkiLCJlbmFibGVEcmFnU29ydCIsImxpc3RDbGFzcyIsInNvcnRhYmxlTGlzdHMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJtYXAiLCJjYWxsIiwibGlzdCIsImVuYWJsZURyYWdMaXN0IiwiY2hpbGRyZW4iLCJpdGVtIiwiZW5hYmxlRHJhZ0l0ZW0iLCJzZXRBdHRyaWJ1dGUiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJoYW5kbGVEcmFnIiwiaGFuZGxlRHJvcCIsInNlbGVjdGVkSXRlbSIsInRhcmdldCIsIngiLCJjbGllbnRYIiwieSIsImNsaWVudFkiLCJzd2FwSXRlbSIsImVsZW1lbnRGcm9tUG9pbnQiLCJuZXh0U2libGluZyIsImluc2VydEJlZm9yZSIsInNldEl0ZW1OdW1iZXIiLCJsaXN0SXRlbXMiLCJsaXN0SXRlbSIsInNhdmVOdW1iZXJUb0RhdGFCYXNlIiwic2F2ZU9yZGVyVG9EYXRhQmFzZSIsInBvc2l0aW9uIiwiaXRlbUlkIiwiZGF0YXNldCIsImxpc3RpdGVtaWQiLCJwYXJlbnRDbHMiLCJmZXRjaFVSTCIsImNvbnRhaW5zIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiY2F0Y2giLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJsaXN0aXRlbU9iaiIsImZyb20iLCJfaWQiLCJsaXN0SWQiLCJsaXN0aWQiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSxTQUFTQSxVQUFULEdBQXNCO0FBQ3JCLE1BQUlDLEtBQUosRUFBV0MsTUFBWCxFQUFtQkMsS0FBbkIsRUFBMEJDLFFBQTFCO0FBQ0FILE9BQUssR0FBR0ksUUFBUSxDQUFDQyxhQUFULENBQXVCLFlBQXZCLENBQVI7QUFDQUosUUFBTSxHQUFHRCxLQUFLLENBQUNNLEtBQU4sQ0FBWUMsV0FBWixFQUFUO0FBQ0FMLE9BQUssR0FBR0UsUUFBUSxDQUFDSSxnQkFBVCxDQUEwQixhQUExQixDQUFSO0FBRUEsTUFBSUMsU0FBUyxHQUFHTCxRQUFRLENBQUNJLGdCQUFULENBQTBCLGtCQUExQixDQUFoQjtBQUNB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LEdBUmQsRUFTQ0MsS0FURCxDQVNPLFVBQUFDLEtBQUs7QUFBQSxXQUFJQyxPQUFPLENBQUNELEtBQVIsQ0FBYyxRQUFkLEVBQXdCQSxLQUF4QixDQUFKO0FBQUEsR0FUWixFQVVDSixJQVZELENBVU0sVUFBQUMsUUFBUTtBQUFBLFdBQUlJLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFVBQVosRUFBd0JSLElBQUksQ0FBQ0MsU0FBTCxDQUFlRSxRQUFmLENBQXhCLENBQUo7QUFBQSxHQVZkO0FBY0E7O0FBR0QsQ0FBQyxZQUFLO0FBQUMvQyxnQkFBYyxDQUFDLGtCQUFELENBQWQ7QUFBbUMsQ0FBMUM7O0FBRUEwRCxNQUFNLENBQUNoRixVQUFQLEdBQW9CQSxVQUFwQixDIiwiZmlsZSI6ImFkbWluX2luZGV4LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL2FkbWluL2FkbWluX2luZGV4LmpzXCIpO1xuIiwiZnVuY3Rpb24gc2VhcmNoTGlzdCgpIHtcblx0dmFyIGlucHV0LCBmaWx0ZXIsIGxhYmVsLCB0eHRWYWx1ZTtcblx0aW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoYmFyJyk7XG5cdGZpbHRlciA9IGlucHV0LnZhbHVlLnRvVXBwZXJDYXNlKCk7XG5cdGxhYmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpc3QtdmFsdWUnKTtcblxuXHRsZXQgbGFzdExpbmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLi0td2l0aG91dC1icmVhaycpXG5cdGxhc3RMaW5lcy5mb3JFYWNoKChsYXN0bGluZSkgPT4ge1xuXHRcdGxhc3RsaW5lLmNsYXNzTGlzdC5yZW1vdmUoJy0td2l0aG91dC1icmVhaycpXG5cdH0pXG5cblx0Ly8gTG9vcCB0aHJvdWdoIGFsbCBsaXN0IGl0ZW1zLCBhbmQgaGlkZSB0aG9zZSB3aG8gZG9uJ3QgbWF0Y2ggdGhlIHNlYXJjaCBxdWVyeVxuXHRmb3IgKGkgPSAwOyBpIDwgbGFiZWwubGVuZ3RoOyBpKyspIHtcblx0XHR0eHRWYWx1ZSA9IGxhYmVsW2ldLmlubmVySFRNTDtcblx0XHRpZiAodHh0VmFsdWUudG9VcHBlckNhc2UoKS5pbmRleE9mKGZpbHRlcikgPiAtMSkge1xuXHRcdFx0bGFiZWxbaV0ucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCctLW5vdC1pbi1xdWVyeScpIFxuXHRcdH0gZWxzZSB7XG5cdFx0XHRsYWJlbFtpXS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJy0tbm90LWluLXF1ZXJ5JykgXG5cdFx0fVxuXHRcdFxuXHRcdGxldCBpblF1ZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNoZWNrYm94LWdyb3VwOm5vdCguLS1ub3QtaW4tcXVlcnkpJyk7XG5cdFx0aWYoaW5RdWVyeSAhPT0gbnVsbCkge1xuXHRcdFx0aW5RdWVyeVtpblF1ZXJ5Lmxlbmd0aCAtIDFdLmNsYXNzTGlzdC5hZGQoJy0td2l0aG91dC1icmVhaycpXG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGVuYWJsZURyYWdTb3J0KGxpc3RDbGFzcykge1xuICBjb25zdCBzb3J0YWJsZUxpc3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShsaXN0Q2xhc3MpO1xuICBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwoc29ydGFibGVMaXN0cywgKGxpc3QpID0+IHtlbmFibGVEcmFnTGlzdChsaXN0KX0pO1xufVxuXG5mdW5jdGlvbiBlbmFibGVEcmFnTGlzdChsaXN0KSB7XG4gIEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbChsaXN0LmNoaWxkcmVuLCAoaXRlbSkgPT4ge2VuYWJsZURyYWdJdGVtKGl0ZW0pfSk7XG59XG5cbmZ1bmN0aW9uIGVuYWJsZURyYWdJdGVtKGl0ZW0pIHtcbiAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2RyYWdnYWJsZScsIHRydWUpXG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIFx0aGFuZGxlRHJhZyhldmVudCwgaXRlbSlcbiAgfSwgZmFsc2UpXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCBmdW5jdGlvbihldmVudCkge1xuICBcdGhhbmRsZURyb3AoZXZlbnQpO1x0XG4gIH0pXG4gIFxufVxuXG5mdW5jdGlvbiBoYW5kbGVEcmFnKGl0ZW0pIHtcbiAgY29uc3Qgc2VsZWN0ZWRJdGVtID0gaXRlbS50YXJnZXQsXG4gICAgICAgIGxpc3QgPSBzZWxlY3RlZEl0ZW0ucGFyZW50Tm9kZSxcbiAgICAgICAgeCA9IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIHkgPSBldmVudC5jbGllbnRZO1xuICBcbiAgc2VsZWN0ZWRJdGVtLmNsYXNzTGlzdC5hZGQoJ2RyYWctc29ydC1hY3RpdmUnKTtcbiAgbGV0IHN3YXBJdGVtID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludCh4LCB5KSA9PT0gbnVsbCA/IHNlbGVjdGVkSXRlbSA6IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoeCwgeSk7XG4gIFxuICBpZiAobGlzdCA9PT0gc3dhcEl0ZW0ucGFyZW50Tm9kZSkge1xuICAgIHN3YXBJdGVtID0gc3dhcEl0ZW0gIT09IHNlbGVjdGVkSXRlbS5uZXh0U2libGluZyA/IHN3YXBJdGVtIDogc3dhcEl0ZW0ubmV4dFNpYmxpbmc7XG4gICAgbGlzdC5pbnNlcnRCZWZvcmUoc2VsZWN0ZWRJdGVtLCBzd2FwSXRlbSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlRHJvcChpdGVtKSB7XG4gIGl0ZW0udGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWctc29ydC1hY3RpdmUnKTtcbiAgc2V0SXRlbU51bWJlcihpdGVtKTtcbn1cblxuZnVuY3Rpb24gc2V0SXRlbU51bWJlcihpdGVtKSB7XG5cdGxldCBsaXN0ID0gaXRlbS50YXJnZXQucGFyZW50Tm9kZTtcblx0bGV0IGxpc3RJdGVtcyA9IGxpc3QucXVlcnlTZWxlY3RvckFsbCgnLm9yZGVyLWxpc3QtaXRlbScpO1xuXHRsaXN0SXRlbXMuZm9yRWFjaCgobGlzdEl0ZW0sIGkpID0+IHtcblx0XHRsaXN0SXRlbS5xdWVyeVNlbGVjdG9yKCcub2JqZWN0LW51bWJlcicpLmlubmVySFRNTCA9IGkgKyAxO1xuXHRcdHNhdmVOdW1iZXJUb0RhdGFCYXNlKGxpc3RJdGVtLCAoaSsxKSlcblx0fSlcblx0c2F2ZU9yZGVyVG9EYXRhQmFzZShsaXN0SXRlbXMpXG59XG5cblxuZnVuY3Rpb24gc2F2ZU51bWJlclRvRGF0YUJhc2UoaXRlbSwgcG9zaXRpb24pIHtcblx0bGV0IGl0ZW1JZCA9IGl0ZW0uZGF0YXNldC5saXN0aXRlbWlkO1xuXHRsZXQgcGFyZW50Q2xzID0gaXRlbS5wYXJlbnROb2RlLmNsYXNzTGlzdFxuXHRcdGxldCBmZXRjaFVSTCA9IG51bGxcblx0XHRzd2l0Y2godHJ1ZSkge1xuXHRcdFx0Y2FzZSBwYXJlbnRDbHMuY29udGFpbnMoJy0tc2VjdGlvbicpOlxuXHRcdFx0XHRmZXRjaFVSTCA9IGAvYWRtaW4vYnRuL3Rhc2tpbnN0YW5jZS9vcmRlci8ke2l0ZW1JZH0vdXBkYXRlYFxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgcGFyZW50Q2xzLmNvbnRhaW5zKCctLXRhc2tpbnN0YW5jZScpOlxuXHRcdFx0XHRmZXRjaFVSTCA9IGAvYWRtaW4vYnRuL3Rhc2svb3JkZXIvJHtpdGVtSWR9L3VwZGF0ZWBcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIHBhcmVudENscy5jb250YWlucygnLS1zZWN0aW9uaW5zdGFuY2UnKTpcblx0XHRcdFx0ZmV0Y2hVUkwgPSBgL2FkbWluL2J0bi9zZWN0aW9uL29yZGVyLyR7aXRlbUlkfS91cGRhdGVgXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0ZmV0Y2hVUkwgPSBcIlwiXG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdGZldGNoKGZldGNoVVJMLCB7XG5cdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0aGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxuXHRcdGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdCdpZCcgOiBpdGVtSWQsIFxuXHRcdFx0J3Bvc2l0aW9uJzogcG9zaXRpb25cblx0XHR9KVxuXHR9KVxuXHQudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG5cdC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKCdFcnJvcjonLCBlcnJvcikpXG5cdC50aGVuKHJlc3BvbnNlID0+IGNvbnNvbGUubG9nKCdTdWNjZXNzOicsIEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSkpO1xufVxuXG5mdW5jdGlvbiBzYXZlT3JkZXJUb0RhdGFCYXNlKGxpc3RJdGVtcykge1xuXHRsZXQgbGlzdCA9IGxpc3RJdGVtc1swXS5wYXJlbnROb2RlO1xuXHRjb25zb2xlLmxvZyhsaXN0KVxuXHRsZXQgcGFyZW50Q2xzID0gbGlzdEl0ZW1zWzBdLnBhcmVudE5vZGUuY2xhc3NMaXN0XG5cdGxldCBmZXRjaFVSTCA9IFwiXCI7XG5cdGxpc3RpdGVtT2JqID0gQXJyYXkuZnJvbShsaXN0SXRlbXMpLm1hcCgobGlzdEl0ZW0pID0+ICh7X2lkOiBsaXN0SXRlbS5kYXRhc2V0Lmxpc3RpdGVtaWR9KSk7XG5cdGxldCBsaXN0SWQgPSBsaXN0LmRhdGFzZXQubGlzdGlkO1xuXHRjb25zb2xlLmxvZyhsaXN0SWQpXG5cdHN3aXRjaCh0cnVlKSB7XG5cdFx0Y2FzZSBwYXJlbnRDbHMuY29udGFpbnMoJy0tc2VjdGlvbicpOlxuXHRcdFx0ZmV0Y2hVUkwgPSBgL2FkbWluL2J0bi9zZWN0aW9uL3Rhc2tpbnN0YW5jZS9vcmRlci8ke2xpc3RJZH0vdXBkYXRlYFxuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBwYXJlbnRDbHMuY29udGFpbnMoJy0tdGFza2luc3RhbmNlJyk6XG5cdFx0XHRmZXRjaFVSTCA9IGAvYWRtaW4vYnRuL3Rhc2tpbnN0YW5jZS90YXNrL29yZGVyLyR7bGlzdElkfS91cGRhdGVgXG5cdFx0XHRicmVhaztcblx0XHRjYXNlIHBhcmVudENscy5jb250YWlucygnLS1zZWN0aW9uaW5zdGFuY2UnKTpcblx0XHRcdGZldGNoVVJMID0gYC9hZG1pbi9idG4vc2VjdGlvbmluc3RhbmNlL3NlY3Rpb24vb3JkZXIvJHtsaXN0SWR9L3VwZGF0ZWBcblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRmZXRjaFVSTCA9IFwiXCJcblx0XHRcdGJyZWFrO1xuXHR9XG5cdGNvbnNvbGUubG9nKGxpc3RpdGVtT2JqKVxuXHRmZXRjaChmZXRjaFVSTCwge1xuXHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcblx0XHRib2R5OiBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHQnaWQnIDogbGlzdElkLCBcblx0XHRcdCdvYmplY3RzJzogbGlzdGl0ZW1PYmpcblx0XHR9KVxuXHR9KVxuXHQudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG5cdC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKCdFcnJvcjonLCBlcnJvcikpXG5cdC50aGVuKHJlc3BvbnNlID0+IGNvbnNvbGUubG9nKCdTdWNjZXNzOicsIEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSkpO1xuXG5cblxufVxuXG5cbigoKT0+IHtlbmFibGVEcmFnU29ydCgnZHJhZy1zb3J0LWVuYWJsZScpfSkoKTtcblxud2luZG93LnNlYXJjaExpc3QgPSBzZWFyY2hMaXN0O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==