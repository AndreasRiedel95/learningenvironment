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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/admin/admin_form.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/admin/admin_form.js":
/*!************************************!*\
  !*** ./src/js/admin/admin_form.js ***!
  \************************************/
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

function displayObject(e) {
  var ul = document.querySelector('.selectedObjectsList');
  var contentId = e.id;

  if (e.checked) {
    var contentObject = e.parentNode.querySelector('.list-value');
    var content = contentObject.innerHTML;
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(content));
    li.setAttribute('data-objectid', contentId);
    li.setAttribute("class", 'selectedObject');
    ul.appendChild(li);
  } else {
    var eleRemove = ul.querySelector(".selectedObject[data-objectid=\"".concat(contentId, "\"]"));
    eleRemove.remove();
  }
}

(function () {
  var checks = document.querySelectorAll('.objectCheckbox');
  checks.forEach(function (checkbox) {
    if (checkbox.checked) {
      displayObject(checkbox);
    }
  });
})();

window.searchList = searchList;
window.displayObject = displayObject;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FkbWluL2FkbWluX2Zvcm0uanMiXSwibmFtZXMiOlsic2VhcmNoTGlzdCIsImlucHV0IiwiZmlsdGVyIiwibGFiZWwiLCJ0eHRWYWx1ZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInZhbHVlIiwidG9VcHBlckNhc2UiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGFzdExpbmVzIiwiZm9yRWFjaCIsImxhc3RsaW5lIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiaSIsImxlbmd0aCIsImlubmVySFRNTCIsImluZGV4T2YiLCJwYXJlbnROb2RlIiwiYWRkIiwiaW5RdWVyeSIsImRpc3BsYXlPYmplY3QiLCJlIiwidWwiLCJjb250ZW50SWQiLCJpZCIsImNoZWNrZWQiLCJjb250ZW50T2JqZWN0IiwiY29udGVudCIsImxpIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiY3JlYXRlVGV4dE5vZGUiLCJzZXRBdHRyaWJ1dGUiLCJlbGVSZW1vdmUiLCJjaGVja3MiLCJjaGVja2JveCIsIndpbmRvdyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFF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QVQsQ0FBMEIsaUJBQTFCLENBQWI7QUFDQTJCLFFBQU0sQ0FBQ3pCLE9BQVAsQ0FBZSxVQUFDMEIsUUFBRCxFQUFjO0FBQzVCLFFBQUdBLFFBQVEsQ0FBQ1YsT0FBWixFQUFxQjtBQUNwQkwsbUJBQWEsQ0FBQ2UsUUFBRCxDQUFiO0FBQ0E7QUFFRCxHQUxEO0FBTUEsQ0FSRDs7QUFVQUMsTUFBTSxDQUFDdEMsVUFBUCxHQUFvQkEsVUFBcEI7QUFDQXNDLE1BQU0sQ0FBQ2hCLGFBQVAsR0FBdUJBLGFBQXZCLEMiLCJmaWxlIjoiYWRtaW5fZm9ybS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9hZG1pbi9hZG1pbl9mb3JtLmpzXCIpO1xuIiwiZnVuY3Rpb24gc2VhcmNoTGlzdCgpIHtcblx0dmFyIGlucHV0LCBmaWx0ZXIsIGxhYmVsLCB0eHRWYWx1ZTtcblx0aW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoYmFyJyk7XG5cdGZpbHRlciA9IGlucHV0LnZhbHVlLnRvVXBwZXJDYXNlKCk7XG5cdGxhYmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpc3QtdmFsdWUnKTtcblxuXHRsZXQgbGFzdExpbmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLi0td2l0aG91dC1icmVhaycpXG5cdGxhc3RMaW5lcy5mb3JFYWNoKChsYXN0bGluZSkgPT4ge1xuXHRcdGxhc3RsaW5lLmNsYXNzTGlzdC5yZW1vdmUoJy0td2l0aG91dC1icmVhaycpXG5cdH0pXG5cblx0Ly8gTG9vcCB0aHJvdWdoIGFsbCBsaXN0IGl0ZW1zLCBhbmQgaGlkZSB0aG9zZSB3aG8gZG9uJ3QgbWF0Y2ggdGhlIHNlYXJjaCBxdWVyeVxuXHRmb3IgKGkgPSAwOyBpIDwgbGFiZWwubGVuZ3RoOyBpKyspIHtcblx0XHR0eHRWYWx1ZSA9IGxhYmVsW2ldLmlubmVySFRNTDtcblx0XHRpZiAodHh0VmFsdWUudG9VcHBlckNhc2UoKS5pbmRleE9mKGZpbHRlcikgPiAtMSkge1xuXHRcdFx0bGFiZWxbaV0ucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCctLW5vdC1pbi1xdWVyeScpIFxuXHRcdH0gZWxzZSB7XG5cdFx0XHRsYWJlbFtpXS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJy0tbm90LWluLXF1ZXJ5JykgXG5cdFx0fVxuXHRcdFxuXHRcdGxldCBpblF1ZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNoZWNrYm94LWdyb3VwOm5vdCguLS1ub3QtaW4tcXVlcnkpJyk7XG5cdFx0aWYoaW5RdWVyeSAhPT0gbnVsbCkge1xuXHRcdFx0aW5RdWVyeVtpblF1ZXJ5Lmxlbmd0aCAtIDFdLmNsYXNzTGlzdC5hZGQoJy0td2l0aG91dC1icmVhaycpXG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlPYmplY3QoZSkge1xuXHRsZXQgdWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWRPYmplY3RzTGlzdCcpO1xuXHRsZXQgY29udGVudElkID0gZS5pZFxuXHRpZihlLmNoZWNrZWQpIHtcblx0XHRsZXQgY29udGVudE9iamVjdCA9IGUucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcubGlzdC12YWx1ZScpO1xuXHRcdGxldCBjb250ZW50ID0gY29udGVudE9iamVjdC5pbm5lckhUTUw7XG5cdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuXHRcdGxpLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvbnRlbnQpKTtcblx0XHRsaS5zZXRBdHRyaWJ1dGUoJ2RhdGEtb2JqZWN0aWQnLCBjb250ZW50SWQpXG5cdFx0bGkuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgJ3NlbGVjdGVkT2JqZWN0Jyk7XG5cdFx0dWwuYXBwZW5kQ2hpbGQobGkpO1xuXHR9IGVsc2Uge1xuXHRcdGxldCBlbGVSZW1vdmUgPSB1bC5xdWVyeVNlbGVjdG9yKGAuc2VsZWN0ZWRPYmplY3RbZGF0YS1vYmplY3RpZD1cIiR7Y29udGVudElkfVwiXWApXG5cdFx0ZWxlUmVtb3ZlLnJlbW92ZSgpO1xuXG5cblx0fVxufVxuXG4oKCkgPT4ge1xuXHRsZXQgY2hlY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9iamVjdENoZWNrYm94Jylcblx0Y2hlY2tzLmZvckVhY2goKGNoZWNrYm94KSA9PiB7XG5cdFx0aWYoY2hlY2tib3guY2hlY2tlZCkge1xuXHRcdFx0ZGlzcGxheU9iamVjdChjaGVja2JveClcdFxuXHRcdH1cblx0XHRcblx0fSlcbn0pKCk7XG5cbndpbmRvdy5zZWFyY2hMaXN0ID0gc2VhcmNoTGlzdDtcbndpbmRvdy5kaXNwbGF5T2JqZWN0ID0gZGlzcGxheU9iamVjdDsiXSwic291cmNlUm9vdCI6IiJ9