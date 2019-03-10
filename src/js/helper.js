var HtmlDiffer = require('html-differ').HtmlDiffer;
let logger = require('html-differ/lib/logger');
var options = {
        ignoreWhitespaces: true,
        ignoreComments: true,
        ignoreEndTags: false,
        ignoreDuplicateAttributes: false
    };
let htmlDiffer = new HtmlDiffer(options);
let htmlDifferOutput = require('node-htmldiff')


const helper = function () {
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
		console.log("expected",expected)
		console.log("actual", actual)
		var diff = htmlDiffer.diffHtml(expected.outerHTML, actual.outerHTML);
		let isEqual = htmlDiffer.isEqual(expected.outerHTML, actual.outerHTML);
		let res = logger.getDiffText(diff, { charsAroundDiff: 0 });
		console.log(diff)
		console.log(res)

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
		console.log(isEqual)
		return isEqual;
	}
	self.checkDuplicates = function (a) {
		for(var i = 0; i <= a.length; i++) {
			for(var j = i; j <= a.length; j++) {
				if(i != j && a[i] == a[j]) {
					return false;
				}
			}
		}
		return true;
	}
	self.getPositionOf = function(element) {
		var h =  Math.round(window.innerHeight)
		console.log("HHHH", h)
		const {top, right, bottom, left, x, y} = element.getBoundingClientRect();
		return {top: Math.round(top - h), right: Math.round(right), bottom: Math.round(bottom), left: Math.round(left)};
	}
}

module.exports = helper;