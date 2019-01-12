// 		const html = editor.getValue().replace(/(\r\n\t|\n|\r\t)/gm, "");
// 		const html2 = html.replace(/\s+/g, '')
// 		const html3 = pretty(html2)
// 		console.log(html3)
// 		const template = "<ol><li>Hallo</li><li>Tschüss</li></ol>".replace(/(\r\n\t|\n|\r\t)/gm, "");
// 		const template2 = template.replace(/\s+/g, '')
// 		const template3 = pretty(template2)
// 		console.log(template3)
// 		let options = {
// 			ignoreCase: true
// 		}
// 		var diff = jsdiff.diffWords(template3, html3, options);
// // green for additions, red for deletions
// // grey for common parts

// 		let display = document.querySelector('.display');
//     	let fragment = document.createDocumentFragment();
//     	let arrays = [];


// 		diff.forEach(function(part){
// 			// color = part.added ? 'green' : part.removed ? 'red' : 'nothing';
// 			// span = document.createElement('span');
// 			// span.style.color = color;
// 			// span.appendChild(document.createTextNode(part.value));
// 			// fragment.appendChild(span);


// 			part.added ? part.user="add" : part.removed ? part.user="remove" : part.user="correct";
// 			color = part.added ? 'green' : part.removed ? 'red' : 'black';
// 			span = document.createElement('span');
// 			span.style.color = color;
// 			span.appendChild(document.createTextNode(part.value));
// 			fragment.appendChild(span);
// 			arrays.push(part)
// 		});

		// console.log(arrays)
		// display.appendChild(fragment);
		// const colorOf = (element) => {
		// 	let bColor = window.getComputedStyle(element, null).getPropertyValue("background-color");
		// 	console.log("color", bColor)
		// 	return bColor;
		// };