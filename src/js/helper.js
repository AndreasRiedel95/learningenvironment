//Helper File for tests 
// Helper Object availabe in all test files

var HtmlDiffer = require('html-differ').HtmlDiffer;
let logger = require('html-differ/lib/logger');
var options = {
        ignoreWhitespaces: true,
        ignoreComments: true,
        ignoreEndTags: false,
        ignoreDuplicateAttributes: false
    };
let htmlDiffer = new HtmlDiffer(options);
let htmlDifferOutput = require('node-htmldiff');


const helper = function (htmlNode) {
	let self = this;
	self.removeAllTextNodes = function (element) {
		var nodes = element.childNodes;
		let node;
		for(var i = 0; i < nodes.length; i++) {
			node = nodes[i];
			// if it's a text node, remove it
			if(node.nodeType == Node.TEXT_NODE) {
				node.parentNode.removeChild(node);
				i--; 
			} else
			// if it's an element, repeat this process
			if(node.nodeType == Node.ELEMENT_NODE) {
				self.removeAllTextNodes(node);
			}
		}
	}

	self.htmlDifferences = function (expected, actual, option) {
		//If Option is striced then its not allwoed to add sth expected has to be exactly the same then actual
		//If no option is given then actual has to be the same then expected but nodes and text can be added to it 
		var diff = htmlDiffer.diffHtml(expected.outerHTML, actual.outerHTML);
		let isEqual = htmlDiffer.isEqual(expected.outerHTML, actual.outerHTML);
		let res = logger.getDiffText(diff, { charsAroundDiff: 0 });
		if(option !== 'undefined' && option !== 'strict' ) {
			if(!isEqual) {
				for(var i = 0 ; i < diff.length; i++){
					if(diff[i].hasOwnProperty("removed") && diff[i].removed === true) {
						isEqual = false;
						break;
					} else {
						isEqual = true;
					}
				} 
			}
		}
		return isEqual;
	}
	
	self.checkIfDuplicatesInArray = function (a) {
		for(var i = 0; i <= a.length; i++) {
			for(var j = i; j <= a.length; j++) {
				if(i != j && a[i] == a[j]) {
					//Duplicates in there
					return true;
				}
			}
		}
		//No Duplicates in there
		return false;
	}
	
	//Get Position of Element when Editor height in calculation
	self.getPositionOfElementWindow = function(ele) {
		let boolean = false;
		boolean = self.checkIfEleExists(ele)
		if(boolean) {
			let element;
			typeof ele === 'string' ? element = htmlNode.querySelector(ele) : element = ele;
			var h =  Math.round(window.innerHeight)
			const {top, right, bottom, left, x, y, width, height} = element.getBoundingClientRect();
			return {top: Math.round(top - h), right: Math.round(right), bottom: Math.round(bottom), left: Math.round(left), width: Math.round(width), height: Math.round(height)};
		} else {
			return null;
		}
		
	}

	self.getPositionOfTextNode = function(ele) {
		if(ele !== null && ele !== undefined) {
			const range = document.createRange();
			range.selectNode(ele);
			return range.getBoundingClientRect();
		} else {
			return null;
		}	
	}

	//Get Position of Element when Editor height is not in calculation
	self.positionOfElement = function(ele) {
		let boolean = false;
		boolean = self.checkIfEleExists(ele)
		if(boolean) {
			let element;
			typeof ele === 'string' ? element = htmlNode.querySelector(ele) : element = ele;
			const {top, right, bottom, left, x, y, width, height} = element.getBoundingClientRect();
			return {top, right, bottom, left, x, y, width, height};
		} else {
			return null;
		}
	}

	self.checkIfInArrayContains = function(array, a) {
		if(Array.from(array).includes(a)){
			return true;
		} else {
			return false;
		}
	}

	self.checkIfValuesEqual = function(array) {
		let arr = Array.from(array)
		return arr.every( v => v === arr[0] );
	}

	self.getStyleProperty = function(ele, property) {
		let boolean = false;
		boolean = self.checkIfEleExists(ele)
		let backgroundColor;
		if(boolean){
			let element;
			typeof ele === 'string' ? element = htmlNode.querySelector(ele) : element = ele
			backgroundColor = getComputedStyle(element, null).getPropertyValue(property)	
		} else {
			backgroundColor = null;
		}
		return backgroundColor;
	}

	self.checkIfEleExists = function(ele) {
		let element;
		console.log(ele)
		typeof ele === 'string' ? element = htmlNode.querySelector(ele) : element = ele;
		let boolean = false
		if(element !== null && element !== undefined) {
			boolean = true;
		} else {
			boolean = false;
		}
		return boolean; 

	}  

	//Creates iFrame for tasks which are using media queries 
	self.createResponsiveFrame = function(width) {
		widthPx = width.toString() + "px"
		let frames = document.querySelectorAll('.media-box'); 
		let count;
		if(frames === 0) {
			count = 1;
		} else {
			count = frames.length + 1
		}
		
		let frame = document.createElement("iframe");
		frame.classList.add('media-box')
		frame.classList.add(`m--${count}`)
		frame.width = widthPx
		document.body.appendChild(frame);
		var destDocument = frame.contentDocument;
   		return destDocument
	}
}

module.exports = helper;