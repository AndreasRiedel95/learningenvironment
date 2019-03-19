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
    handleDrag(event);
  }, false);
  document.addEventListener('dragend', function (event) {
    handleDrop(event);
  });
}

function handleDrag(event) {
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
  var list = event.target.parentNode;
  setItemNumber(list);
}

function setItemNumber(list) {
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
  setItemNumber(document.querySelector('.order-list'));
})();

(function () {
  enableDragSort('drag-sort-enable');
})();

window.searchList = searchList;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FkbWluL2FkbWluX2luZGV4LmpzIl0sIm5hbWVzIjpbInNlYXJjaExpc3QiLCJpbnB1dCIsImZpbHRlciIsImxhYmVsIiwidHh0VmFsdWUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ2YWx1ZSIsInRvVXBwZXJDYXNlIiwicXVlcnlTZWxlY3RvckFsbCIsImxhc3RMaW5lcyIsImZvckVhY2giLCJsYXN0bGluZSIsImNsYXNzTGlzdCIsInJlbW92ZSIsImkiLCJsZW5ndGgiLCJpbm5lckhUTUwiLCJpbmRleE9mIiwicGFyZW50Tm9kZSIsImFkZCIsImluUXVlcnkiLCJ4IiwieSIsImVuYWJsZURyYWdTb3J0IiwibGlzdENsYXNzIiwic29ydGFibGVMaXN0cyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJBcnJheSIsInByb3RvdHlwZSIsIm1hcCIsImNhbGwiLCJsaXN0IiwiZW5hYmxlRHJhZ0xpc3QiLCJjaGlsZHJlbiIsIml0ZW0iLCJlbmFibGVEcmFnSXRlbSIsInNldEF0dHJpYnV0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImRhdGFUcmFuc2ZlciIsInNldERhdGEiLCJvbmRyYWdvdmVyIiwid2luZG93IiwiY2xpZW50WCIsImNsaWVudFkiLCJoYW5kbGVEcmFnIiwiaGFuZGxlRHJvcCIsInNlbGVjdGVkSXRlbSIsInRhcmdldCIsInN3YXBJdGVtIiwiZWxlbWVudEZyb21Qb2ludCIsIm5leHRTaWJsaW5nIiwiaW5zZXJ0QmVmb3JlIiwic2V0SXRlbU51bWJlciIsImxpc3RJdGVtcyIsImxpc3RJdGVtIiwic2F2ZU51bWJlclRvRGF0YUJhc2UiLCJzYXZlT3JkZXJUb0RhdGFCYXNlIiwicG9zaXRpb24iLCJpdGVtSWQiLCJkYXRhc2V0IiwibGlzdGl0ZW1pZCIsInBhcmVudENscyIsImZldGNoVVJMIiwiY29udGFpbnMiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJjYXRjaCIsImVycm9yIiwiY29uc29sZSIsImxvZyIsImxpc3RpdGVtT2JqIiwiZnJvbSIsIl9pZCIsImxpc3RJZCIsImxpc3RpZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLFNBQVNBLFVBQVQsR0FBc0I7QUFDckIsTUFBSUMsS0FBSixFQUFXQyxNQUFYLEVBQW1CQyxLQUFuQixFQUEwQkMsUUFBMUI7QUFDQUgsT0FBSyxHQUFHSSxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBUjtBQUNBSixRQUFNLEdBQUdELEtBQUssQ0FBQ00sS0FBTixDQUFZQyxXQUFaLEVBQVQ7QUFDQUwsT0FBSyxHQUFHRSxRQUFRLENBQUNJLGdCQUFULENBQTBCLGFBQTFCLENBQVI7QUFFQSxNQUFJQyxTQUFTLEdBQUdMLFFB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QUFDQyxHQUFSLENBQVlDLFdBQVo7QUFDQWIsT0FBSyxDQUFDRixRQUFELEVBQVc7QUFDZkcsVUFBTSxFQUFFLE1BRE87QUFFZkMsV0FBTyxFQUFFO0FBQUMsc0JBQWdCO0FBQWpCLEtBRk07QUFHZkMsUUFBSSxFQUFFQyxJQUFJLENBQUNDLFNBQUwsQ0FBZTtBQUNwQixZQUFPVyxNQURhO0FBRXBCLGlCQUFXSDtBQUZTLEtBQWY7QUFIUyxHQUFYLENBQUwsQ0FRQ1AsSUFSRCxDQVFNLFVBQUFDLFFBQVE7QUFBQSxXQUFJQSxRQUFRLENBQUNDLElBQVQsRUFBSjtBQUFBLEdBUmQsRUFTQ0MsS0FURCxDQVNPLFVBQUFDLEtBQUs7QUFBQSxXQUFJQyxPQUFPLENBQUNELEtBQVIsQ0FBYyxRQUFkLEVBQXdCQSxLQUF4QixDQUFKO0FBQUEsR0FUWixFQVVDSixJQVZELENBVU0sVUFBQUMsUUFBUTtBQUFBLFdBQUlJLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFVBQVosRUFBd0JSLElBQUksQ0FBQ0MsU0FBTCxDQUFlRSxRQUFmLENBQXhCLENBQUo7QUFBQSxHQVZkO0FBY0E7O0FBR0QsQ0FBQyxZQUFNO0FBQUNuQixlQUFhLENBQUNqRCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBRCxDQUFiO0FBQXFELENBQTdEOztBQUNBLENBQUMsWUFBSztBQUFDa0IsZ0JBQWMsQ0FBQyxrQkFBRCxDQUFkO0FBQW1DLENBQTFDOztBQUVBbUIsTUFBTSxDQUFDM0MsVUFBUCxHQUFvQkEsVUFBcEIsQyIsImZpbGUiOiJhZG1pbl9pbmRleC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9hZG1pbi9hZG1pbl9pbmRleC5qc1wiKTtcbiIsImZ1bmN0aW9uIHNlYXJjaExpc3QoKSB7XG5cdHZhciBpbnB1dCwgZmlsdGVyLCBsYWJlbCwgdHh0VmFsdWU7XG5cdGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaGJhcicpO1xuXHRmaWx0ZXIgPSBpbnB1dC52YWx1ZS50b1VwcGVyQ2FzZSgpO1xuXHRsYWJlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5saXN0LXZhbHVlJyk7XG5cblx0bGV0IGxhc3RMaW5lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy4tLXdpdGhvdXQtYnJlYWsnKVxuXHRsYXN0TGluZXMuZm9yRWFjaCgobGFzdGxpbmUpID0+IHtcblx0XHRsYXN0bGluZS5jbGFzc0xpc3QucmVtb3ZlKCctLXdpdGhvdXQtYnJlYWsnKVxuXHR9KVxuXG5cdC8vIExvb3AgdGhyb3VnaCBhbGwgbGlzdCBpdGVtcywgYW5kIGhpZGUgdGhvc2Ugd2hvIGRvbid0IG1hdGNoIHRoZSBzZWFyY2ggcXVlcnlcblx0Zm9yIChpID0gMDsgaSA8IGxhYmVsLmxlbmd0aDsgaSsrKSB7XG5cdFx0dHh0VmFsdWUgPSBsYWJlbFtpXS5pbm5lckhUTUw7XG5cdFx0aWYgKHR4dFZhbHVlLnRvVXBwZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXIpID4gLTEpIHtcblx0XHRcdGxhYmVsW2ldLnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnLS1ub3QtaW4tcXVlcnknKSBcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGFiZWxbaV0ucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCctLW5vdC1pbi1xdWVyeScpIFxuXHRcdH1cblx0XHRcblx0XHRsZXQgaW5RdWVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGVja2JveC1ncm91cDpub3QoLi0tbm90LWluLXF1ZXJ5KScpO1xuXHRcdGlmKGluUXVlcnkgIT09IG51bGwpIHtcblx0XHRcdGluUXVlcnlbaW5RdWVyeS5sZW5ndGggLSAxXS5jbGFzc0xpc3QuYWRkKCctLXdpdGhvdXQtYnJlYWsnKVxuXHRcdH1cblx0fVxufVxuXG4vL3ZhcmlhYmxlcyBuZWVkZWQgZm9yIGZpcmVmb3ggXG52YXIgeCA9IDAsXG4gICAgeSA9IDA7XG5cblxuZnVuY3Rpb24gZW5hYmxlRHJhZ1NvcnQobGlzdENsYXNzKSB7XG4gIGNvbnN0IHNvcnRhYmxlTGlzdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGxpc3RDbGFzcyk7XG4gIEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbChzb3J0YWJsZUxpc3RzLCAobGlzdCkgPT4ge2VuYWJsZURyYWdMaXN0KGxpc3QpfSk7XG59XG5cbmZ1bmN0aW9uIGVuYWJsZURyYWdMaXN0KGxpc3QpIHtcbiAgQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKGxpc3QuY2hpbGRyZW4sIChpdGVtKSA9PiB7ZW5hYmxlRHJhZ0l0ZW0oaXRlbSl9KTtcbn1cblxuZnVuY3Rpb24gZW5hYmxlRHJhZ0l0ZW0oaXRlbSkge1xuICBpdGVtLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgdHJ1ZSlcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBmdW5jdGlvbihldmVudCkge1xuICBcdGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCdhcHBsaWNhdGlvbi9ub2RlIHR5cGUnLCB0aGlzKTtcbiAgICBkb2N1bWVudC5vbmRyYWdvdmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICAgIHggPSBldmVudC5jbGllbnRYLFxuICAgICAgICB5ID0gZXZlbnQuY2xpZW50WTtcbiAgICB9O1xuICB9LCBmYWxzZSlcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgXHRoYW5kbGVEcmFnKGV2ZW50KVxuICB9LCBmYWxzZSlcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIFx0aGFuZGxlRHJvcChldmVudCk7XHRcbiAgfSlcbiAgXG59XG5cblxuZnVuY3Rpb24gaGFuZGxlRHJhZyhldmVudCkge1xuICBjb25zdCBzZWxlY3RlZEl0ZW0gPSBldmVudC50YXJnZXQsXG4gICAgICAgIGxpc3QgPSBzZWxlY3RlZEl0ZW0ucGFyZW50Tm9kZTtcbiAgc2VsZWN0ZWRJdGVtLmNsYXNzTGlzdC5hZGQoJ2RyYWctc29ydC1hY3RpdmUnKTtcblxuICBsZXQgc3dhcEl0ZW0gPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KHgsIHkpID09PSBudWxsID8gc2VsZWN0ZWRJdGVtIDogZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludCh4LCB5KTtcbiAgXG4gIGlmIChsaXN0ID09PSBzd2FwSXRlbS5wYXJlbnROb2RlKSB7XG4gICAgc3dhcEl0ZW0gPSBzd2FwSXRlbSAhPT0gc2VsZWN0ZWRJdGVtLm5leHRTaWJsaW5nID8gc3dhcEl0ZW0gOiBzd2FwSXRlbS5uZXh0U2libGluZztcbiAgICBsaXN0Lmluc2VydEJlZm9yZShzZWxlY3RlZEl0ZW0sIHN3YXBJdGVtKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVEcm9wKGV2ZW50KSB7XG4gIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLXNvcnQtYWN0aXZlJyk7XG4gIGxldCBsaXN0ID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGVcbiAgc2V0SXRlbU51bWJlcihsaXN0KTtcbn1cblxuZnVuY3Rpb24gc2V0SXRlbU51bWJlcihsaXN0KSB7XG5cdGxldCBsaXN0SXRlbXMgPSBsaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcmRlci1saXN0LWl0ZW0nKTtcblx0bGlzdEl0ZW1zLmZvckVhY2goKGxpc3RJdGVtLCBpKSA9PiB7XG5cdFx0bGlzdEl0ZW0ucXVlcnlTZWxlY3RvcignLm9iamVjdC1udW1iZXInKS5pbm5lckhUTUwgPSBpICsgMTtcblx0XHRzYXZlTnVtYmVyVG9EYXRhQmFzZShsaXN0SXRlbSwgKGkrMSkpXG5cdH0pXG5cdHNhdmVPcmRlclRvRGF0YUJhc2UobGlzdEl0ZW1zKVxufVxuXG5cbmZ1bmN0aW9uIHNhdmVOdW1iZXJUb0RhdGFCYXNlKGl0ZW0sIHBvc2l0aW9uKSB7XG5cdGxldCBpdGVtSWQgPSBpdGVtLmRhdGFzZXQubGlzdGl0ZW1pZDtcblx0bGV0IHBhcmVudENscyA9IGl0ZW0ucGFyZW50Tm9kZS5jbGFzc0xpc3Rcblx0XHRsZXQgZmV0Y2hVUkwgPSBudWxsXG5cdFx0c3dpdGNoKHRydWUpIHtcblx0XHRcdGNhc2UgcGFyZW50Q2xzLmNvbnRhaW5zKCctLXNlY3Rpb24nKTpcblx0XHRcdFx0ZmV0Y2hVUkwgPSBgL2FkbWluL2J0bi90YXNraW5zdGFuY2Uvb3JkZXIvJHtpdGVtSWR9L3VwZGF0ZWBcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIHBhcmVudENscy5jb250YWlucygnLS10YXNraW5zdGFuY2UnKTpcblx0XHRcdFx0ZmV0Y2hVUkwgPSBgL2FkbWluL2J0bi90YXNrL29yZGVyLyR7aXRlbUlkfS91cGRhdGVgXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBwYXJlbnRDbHMuY29udGFpbnMoJy0tc2VjdGlvbmluc3RhbmNlJyk6XG5cdFx0XHRcdGZldGNoVVJMID0gYC9hZG1pbi9idG4vc2VjdGlvbi9vcmRlci8ke2l0ZW1JZH0vdXBkYXRlYFxuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGZldGNoVVJMID0gXCJcIlxuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHRmZXRjaChmZXRjaFVSTCwge1xuXHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcblx0XHRib2R5OiBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHQnaWQnIDogaXRlbUlkLCBcblx0XHRcdCdwb3NpdGlvbic6IHBvc2l0aW9uXG5cdFx0fSlcblx0fSlcblx0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuXHQuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcignRXJyb3I6JywgZXJyb3IpKVxuXHQudGhlbihyZXNwb25zZSA9PiBjb25zb2xlLmxvZygnU3VjY2VzczonLCBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpKTtcbn1cblxuZnVuY3Rpb24gc2F2ZU9yZGVyVG9EYXRhQmFzZShsaXN0SXRlbXMpIHtcblx0bGV0IGxpc3QgPSBsaXN0SXRlbXNbMF0ucGFyZW50Tm9kZTtcblx0bGV0IHBhcmVudENscyA9IGxpc3RJdGVtc1swXS5wYXJlbnROb2RlLmNsYXNzTGlzdFxuXHRsZXQgZmV0Y2hVUkwgPSBcIlwiO1xuXHRsaXN0aXRlbU9iaiA9IEFycmF5LmZyb20obGlzdEl0ZW1zKS5tYXAoKGxpc3RJdGVtKSA9PiAoe19pZDogbGlzdEl0ZW0uZGF0YXNldC5saXN0aXRlbWlkfSkpO1xuXHRsZXQgbGlzdElkID0gbGlzdC5kYXRhc2V0Lmxpc3RpZDtcblx0c3dpdGNoKHRydWUpIHtcblx0XHRjYXNlIHBhcmVudENscy5jb250YWlucygnLS1zZWN0aW9uJyk6XG5cdFx0XHRmZXRjaFVSTCA9IGAvYWRtaW4vYnRuL3NlY3Rpb24vdGFza2luc3RhbmNlL29yZGVyLyR7bGlzdElkfS91cGRhdGVgXG5cdFx0XHRicmVhaztcblx0XHRjYXNlIHBhcmVudENscy5jb250YWlucygnLS10YXNraW5zdGFuY2UnKTpcblx0XHRcdGZldGNoVVJMID0gYC9hZG1pbi9idG4vdGFza2luc3RhbmNlL3Rhc2svb3JkZXIvJHtsaXN0SWR9L3VwZGF0ZWBcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgcGFyZW50Q2xzLmNvbnRhaW5zKCctLXNlY3Rpb25pbnN0YW5jZScpOlxuXHRcdFx0ZmV0Y2hVUkwgPSBgL2FkbWluL2J0bi9zZWN0aW9uaW5zdGFuY2Uvc2VjdGlvbi9vcmRlci8ke2xpc3RJZH0vdXBkYXRlYFxuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdGZldGNoVVJMID0gXCJcIlxuXHRcdFx0YnJlYWs7XG5cdH1cblx0Y29uc29sZS5sb2cobGlzdGl0ZW1PYmopXG5cdGZldGNoKGZldGNoVVJMLCB7XG5cdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0aGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxuXHRcdGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdCdpZCcgOiBsaXN0SWQsIFxuXHRcdFx0J29iamVjdHMnOiBsaXN0aXRlbU9ialxuXHRcdH0pXG5cdH0pXG5cdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcblx0LmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoJ0Vycm9yOicsIGVycm9yKSlcblx0LnRoZW4ocmVzcG9uc2UgPT4gY29uc29sZS5sb2coJ1N1Y2Nlc3M6JywgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKSk7XG5cblxuXG59XG5cblxuKCgpID0+IHtzZXRJdGVtTnVtYmVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcmRlci1saXN0JykpfSkoKTtcbigoKT0+IHtlbmFibGVEcmFnU29ydCgnZHJhZy1zb3J0LWVuYWJsZScpfSkoKTtcblxud2luZG93LnNlYXJjaExpc3QgPSBzZWFyY2hMaXN0O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==