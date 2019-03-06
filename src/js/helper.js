var HtmlDiffer = require('html-differ').HtmlDiffer;
let logger = require('html-differ/lib/logger');
var options = {
        ignoreWhitespaces: true,
        ignoreComments: true,
        ignoreEndTags: false,
        ignoreDuplicateAttributes: false
    };
let htmlDiffer = new HtmlDiffer();
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
	self.htmlDifferences = function (oldHtml, newHtml, option) {
		var diff = htmlDiffer.diffHtml(oldHtml.innerHTML, oldHtml.innerHTML);
		let isEqual = htmlDiffer.isEqual(oldHtml.innerHTML, newHtml.innerHTML);
		let res = logger.getDiffText(diff, { charsAroundDiff: 100 });
		logger.logDiffText(diff, { charsAroundDiff: 100 });
		console.log("diff", diff)
		console.log("e", isEqual)
		console.log("r", res)
		console.log("o", option)
		if(option !== undefined && option === 'strict' ) {
			let boolean = false
			if(!isEqual) {
				let node = htmlDifferOutput(oldHtml.innerHTML, newHtml.innerHTML)
				let div = document.createElement('div');
				div.innerHTML = node
				console.log(div)
				let dataDels = div.querySelectorAll('[data-diff-node="del"]')
				let dels = div.querySelectorAll('del')
			}

		}

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
}

module.exports = helper;