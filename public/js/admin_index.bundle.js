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

//variables needed for firefox 
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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FkbWluL2FkbWluX2luZGV4LmpzIl0sIm5hbWVzIjpbIngiLCJ5IiwiZW5hYmxlRHJhZ1NvcnQiLCJsaXN0Q2xhc3MiLCJzb3J0YWJsZUxpc3RzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJtYXAiLCJjYWxsIiwibGlzdCIsImVuYWJsZURyYWdMaXN0IiwiY2hpbGRyZW4iLCJpdGVtIiwiZW5hYmxlRHJhZ0l0ZW0iLCJzZXRBdHRyaWJ1dGUiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwib25kcmFnb3ZlciIsIndpbmRvdyIsImNsaWVudFgiLCJjbGllbnRZIiwiaGFuZGxlRHJhZyIsImhhbmRsZURyb3AiLCJzZWxlY3RlZEl0ZW0iLCJ0YXJnZXQiLCJwYXJlbnROb2RlIiwiY2xhc3NMaXN0IiwiYWRkIiwic3dhcEl0ZW0iLCJlbGVtZW50RnJvbVBvaW50IiwibmV4dFNpYmxpbmciLCJpbnNlcnRCZWZvcmUiLCJyZW1vdmUiLCJzZXRJdGVtTnVtYmVyIiwibGlzdEl0ZW1zIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJsaXN0SXRlbSIsImkiLCJxdWVyeVNlbGVjdG9yIiwiaW5uZXJIVE1MIiwic2F2ZU51bWJlclRvRGF0YUJhc2UiLCJzYXZlT3JkZXJUb0RhdGFCYXNlIiwicG9zaXRpb24iLCJpdGVtSWQiLCJkYXRhc2V0IiwibGlzdGl0ZW1pZCIsInBhcmVudENscyIsImZldGNoVVJMIiwiY29udGFpbnMiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJjYXRjaCIsImVycm9yIiwiY29uc29sZSIsImxvZyIsImxpc3RpdGVtT2JqIiwiZnJvbSIs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QVEsQ0FBQ0MsSUFBVCxFQUFKO0FBQUEsR0FSZCxFQVNDQyxLQVRELENBU08sVUFBQUMsS0FBSztBQUFBLFdBQUlDLE9BQU8sQ0FBQ0QsS0FBUixDQUFjLFFBQWQsRUFBd0JBLEtBQXhCLENBQUo7QUFBQSxHQVRaLEVBVUNKLElBVkQsQ0FVTSxVQUFBQyxRQUFRO0FBQUEsV0FBSUksT0FBTyxDQUFDQyxHQUFSLENBQVksVUFBWixFQUF3QlIsSUFBSSxDQUFDQyxTQUFMLENBQWVFLFFBQWYsQ0FBeEIsQ0FBSjtBQUFBLEdBVmQ7QUFjQTs7QUFHRCxDQUFDLFlBQU07QUFBQ3hCLGVBQWEsQ0FBQ2hDLFFBQVEsQ0FBQ3NDLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBRCxDQUFiO0FBQXFELENBQTdEOztBQUNBLENBQUMsWUFBSztBQUFDekMsZ0JBQWMsQ0FBQyxrQkFBRCxDQUFkO0FBQW1DLENBQTFDLEkiLCJmaWxlIjoiYWRtaW5faW5kZXguYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvYWRtaW4vYWRtaW5faW5kZXguanNcIik7XG4iLCIvL3ZhcmlhYmxlcyBuZWVkZWQgZm9yIGZpcmVmb3ggXG52YXIgeCA9IDAsXG4gICAgeSA9IDA7XG5cblxuZnVuY3Rpb24gZW5hYmxlRHJhZ1NvcnQobGlzdENsYXNzKSB7XG4gIGNvbnN0IHNvcnRhYmxlTGlzdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGxpc3RDbGFzcyk7XG4gIEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbChzb3J0YWJsZUxpc3RzLCAobGlzdCkgPT4ge2VuYWJsZURyYWdMaXN0KGxpc3QpfSk7XG59XG5cbmZ1bmN0aW9uIGVuYWJsZURyYWdMaXN0KGxpc3QpIHtcbiAgQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKGxpc3QuY2hpbGRyZW4sIChpdGVtKSA9PiB7ZW5hYmxlRHJhZ0l0ZW0oaXRlbSl9KTtcbn1cblxuZnVuY3Rpb24gZW5hYmxlRHJhZ0l0ZW0oaXRlbSkge1xuICBpdGVtLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgdHJ1ZSlcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBmdW5jdGlvbihldmVudCkge1xuICBcdGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCdhcHBsaWNhdGlvbi9ub2RlIHR5cGUnLCB0aGlzKTtcbiAgICBkb2N1bWVudC5vbmRyYWdvdmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICAgIHggPSBldmVudC5jbGllbnRYLFxuICAgICAgICB5ID0gZXZlbnQuY2xpZW50WTtcbiAgICB9O1xuICB9LCBmYWxzZSlcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgXHRoYW5kbGVEcmFnKGV2ZW50KVxuICB9LCBmYWxzZSlcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIFx0aGFuZGxlRHJvcChldmVudCk7XHRcbiAgfSlcbiAgXG59XG5cblxuZnVuY3Rpb24gaGFuZGxlRHJhZyhldmVudCkge1xuICBjb25zdCBzZWxlY3RlZEl0ZW0gPSBldmVudC50YXJnZXQsXG4gICAgICAgIGxpc3QgPSBzZWxlY3RlZEl0ZW0ucGFyZW50Tm9kZTtcbiAgc2VsZWN0ZWRJdGVtLmNsYXNzTGlzdC5hZGQoJ2RyYWctc29ydC1hY3RpdmUnKTtcblxuICBsZXQgc3dhcEl0ZW0gPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KHgsIHkpID09PSBudWxsID8gc2VsZWN0ZWRJdGVtIDogZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludCh4LCB5KTtcbiAgXG4gIGlmIChsaXN0ID09PSBzd2FwSXRlbS5wYXJlbnROb2RlKSB7XG4gICAgc3dhcEl0ZW0gPSBzd2FwSXRlbSAhPT0gc2VsZWN0ZWRJdGVtLm5leHRTaWJsaW5nID8gc3dhcEl0ZW0gOiBzd2FwSXRlbS5uZXh0U2libGluZztcbiAgICBsaXN0Lmluc2VydEJlZm9yZShzZWxlY3RlZEl0ZW0sIHN3YXBJdGVtKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVEcm9wKGV2ZW50KSB7XG4gIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLXNvcnQtYWN0aXZlJyk7XG4gIGxldCBsaXN0ID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGVcbiAgc2V0SXRlbU51bWJlcihsaXN0KTtcbn1cblxuZnVuY3Rpb24gc2V0SXRlbU51bWJlcihsaXN0KSB7XG5cdGxldCBsaXN0SXRlbXMgPSBsaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcmRlci1saXN0LWl0ZW0nKTtcblx0bGlzdEl0ZW1zLmZvckVhY2goKGxpc3RJdGVtLCBpKSA9PiB7XG5cdFx0bGlzdEl0ZW0ucXVlcnlTZWxlY3RvcignLm9iamVjdC1udW1iZXInKS5pbm5lckhUTUwgPSBpICsgMTtcblx0XHRzYXZlTnVtYmVyVG9EYXRhQmFzZShsaXN0SXRlbSwgKGkrMSkpXG5cdH0pXG5cdHNhdmVPcmRlclRvRGF0YUJhc2UobGlzdEl0ZW1zKVxufVxuXG5cbmZ1bmN0aW9uIHNhdmVOdW1iZXJUb0RhdGFCYXNlKGl0ZW0sIHBvc2l0aW9uKSB7XG5cdGxldCBpdGVtSWQgPSBpdGVtLmRhdGFzZXQubGlzdGl0ZW1pZDtcblx0bGV0IHBhcmVudENscyA9IGl0ZW0ucGFyZW50Tm9kZS5jbGFzc0xpc3Rcblx0XHRsZXQgZmV0Y2hVUkwgPSBudWxsXG5cdFx0c3dpdGNoKHRydWUpIHtcblx0XHRcdGNhc2UgcGFyZW50Q2xzLmNvbnRhaW5zKCctLXNlY3Rpb24nKTpcblx0XHRcdFx0ZmV0Y2hVUkwgPSBgL2FkbWluL2J0bi90YXNraW5zdGFuY2Uvb3JkZXIvJHtpdGVtSWR9L3VwZGF0ZWBcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIHBhcmVudENscy5jb250YWlucygnLS10YXNraW5zdGFuY2UnKTpcblx0XHRcdFx0ZmV0Y2hVUkwgPSBgL2FkbWluL2J0bi90YXNrL29yZGVyLyR7aXRlbUlkfS91cGRhdGVgXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBwYXJlbnRDbHMuY29udGFpbnMoJy0tc2VjdGlvbmluc3RhbmNlJyk6XG5cdFx0XHRcdGZldGNoVVJMID0gYC9hZG1pbi9idG4vc2VjdGlvbi9vcmRlci8ke2l0ZW1JZH0vdXBkYXRlYFxuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGZldGNoVVJMID0gXCJcIlxuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHRmZXRjaChmZXRjaFVSTCwge1xuXHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcblx0XHRib2R5OiBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHQnaWQnIDogaXRlbUlkLCBcblx0XHRcdCdwb3NpdGlvbic6IHBvc2l0aW9uXG5cdFx0fSlcblx0fSlcblx0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuXHQuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcignRXJyb3I6JywgZXJyb3IpKVxuXHQudGhlbihyZXNwb25zZSA9PiBjb25zb2xlLmxvZygnU3VjY2VzczonLCBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpKTtcbn1cblxuZnVuY3Rpb24gc2F2ZU9yZGVyVG9EYXRhQmFzZShsaXN0SXRlbXMpIHtcblx0bGV0IGxpc3QgPSBsaXN0SXRlbXNbMF0ucGFyZW50Tm9kZTtcblx0bGV0IHBhcmVudENscyA9IGxpc3RJdGVtc1swXS5wYXJlbnROb2RlLmNsYXNzTGlzdFxuXHRsZXQgZmV0Y2hVUkwgPSBcIlwiO1xuXHRsaXN0aXRlbU9iaiA9IEFycmF5LmZyb20obGlzdEl0ZW1zKS5tYXAoKGxpc3RJdGVtKSA9PiAoe19pZDogbGlzdEl0ZW0uZGF0YXNldC5saXN0aXRlbWlkfSkpO1xuXHRsZXQgbGlzdElkID0gbGlzdC5kYXRhc2V0Lmxpc3RpZDtcblx0c3dpdGNoKHRydWUpIHtcblx0XHRjYXNlIHBhcmVudENscy5jb250YWlucygnLS1zZWN0aW9uJyk6XG5cdFx0XHRmZXRjaFVSTCA9IGAvYWRtaW4vYnRuL3NlY3Rpb24vdGFza2luc3RhbmNlL29yZGVyLyR7bGlzdElkfS91cGRhdGVgXG5cdFx0XHRicmVhaztcblx0XHRjYXNlIHBhcmVudENscy5jb250YWlucygnLS10YXNraW5zdGFuY2UnKTpcblx0XHRcdGZldGNoVVJMID0gYC9hZG1pbi9idG4vdGFza2luc3RhbmNlL3Rhc2svb3JkZXIvJHtsaXN0SWR9L3VwZGF0ZWBcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgcGFyZW50Q2xzLmNvbnRhaW5zKCctLXNlY3Rpb25pbnN0YW5jZScpOlxuXHRcdFx0ZmV0Y2hVUkwgPSBgL2FkbWluL2J0bi9zZWN0aW9uaW5zdGFuY2Uvc2VjdGlvbi9vcmRlci8ke2xpc3RJZH0vdXBkYXRlYFxuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdGZldGNoVVJMID0gXCJcIlxuXHRcdFx0YnJlYWs7XG5cdH1cblx0Y29uc29sZS5sb2cobGlzdGl0ZW1PYmopXG5cdGZldGNoKGZldGNoVVJMLCB7XG5cdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0aGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxuXHRcdGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdCdpZCcgOiBsaXN0SWQsIFxuXHRcdFx0J29iamVjdHMnOiBsaXN0aXRlbU9ialxuXHRcdH0pXG5cdH0pXG5cdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcblx0LmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoJ0Vycm9yOicsIGVycm9yKSlcblx0LnRoZW4ocmVzcG9uc2UgPT4gY29uc29sZS5sb2coJ1N1Y2Nlc3M6JywgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKSk7XG5cblxuXG59XG5cblxuKCgpID0+IHtzZXRJdGVtTnVtYmVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcmRlci1saXN0JykpfSkoKTtcbigoKT0+IHtlbmFibGVEcmFnU29ydCgnZHJhZy1zb3J0LWVuYWJsZScpfSkoKTsiXSwic291cmNlUm9vdCI6IiJ9