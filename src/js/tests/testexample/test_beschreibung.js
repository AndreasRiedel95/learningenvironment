// die Konstanze die exportiert wird, selber Name wie File-Name (Taskinstance nummer)
const test1 = function () {
	let self = this;
	//run1 Nummer wie Task-Nummer
	self.run1 = (htmlNode, cssString, test, h, HelperInstance) => {
		//htmlNode: DOM-Node, den der User eingegeben hat,
		//cssString: String der CSS, den der User eingegeben hat 
		//test: Test Element, der Library tapeCSS -> https://github.com/studio-b12/tape-css
		// TapeCSS baut auf die Unit-Test-Bibliothek Tape auf -> https://github.com/substack/tape
		//h: Hyperscript Element um Node Elemente einfach zu bilden -> https://www.npmjs.com/package/hyperscript
		//HelperInstance: Hierüber können Helferfunktionen aufgerufen werden: File befindet sich in: /public/js/helper.js

		//Ein Test wird wie folgt geschrieben: 
			//Doku der möglichen Methoden: https://github.com/substack/tape

		// Dem test-Element wird das DOM Element und der CSSString übergeben.
		// Während des Tests fügt die Test-Bibliothek die übergebenen Elemente an das Ende des <body> Elementes an, nach dem Test werden die Elemente wieder gelöscht. 
		// Der User sieht davon nichts.
		// Tape ist eine sehr minimalistische Test Umgebung. Die Bibliothek wurde bewusst gewählt um die Tests so einfach wie möglich zu halten. 
		
		
		test('Roses are red, <span>s are blue', {
			dom: htmlNode, //DOM des Users wird übergeben
			styles: cssString, //CssString des Users wird übergeben
		}, (asset) => {
			// Our span and styles are here to play with.
			asset.equal(
				getComputedStyle(htmlNode.querySelector('span')).getPropertyValue('background-color'),
				'rgb(0, 0, 255)', 
				"Sind Sie sicher, dass ihr <span>-Element die Hintergrundfarbe blau hat." //Diese fehlermeldung wird dem User angezeigt, wenn der Test nicht korrekt ist
			);

			asset.end();
			// We’ve now cleaned up the place!
		});
	}
	//Es können mehrere Tests pro Run durchgeführt werden
	//Jeder Run muss ein erfülltes Promise zurückgeben.
	return Promise.resolve();
}

//Modul muss exportiert werden
module.exports = test1;


		////////////////////////////////////// REAL LIFE EXAMPLE //////////////////////////////////////


	//1. Erstellen Sie eine <ul>-Liste mit einem <li>-Element
	//2. Färben Sie das <li>-Element mit der Hintergrundfrabe blau ein

	self.run1 = (htmlNode, cssString, test, h, HelperInstance) => {
		//Zunächst wird überprüft ob die Struktur stimmt. 
		//Hierfür wird die erwartete Struktur mit der Hyperscript Bibliothek erstellt.
		let liExpect = h('li')
		let ulExpect = h('ul', [liExpect])

		
		test('<ul>-Element mit <li>-Element ist vorhanden', { //Beschreibung was getestet wird
			dom: htmlNode //DOM Element wird der Test-Bibliothek übergeben
		}, (asset) => {
			let ulUser = htmlNode.querySelector('ul') //<ul> Element des Users wird gesucht
			let boolean = false; //Test boolean wird definiert
			if(ulUser !== null) { // wenn ulUser existiert....
				//Helperinstancen werden benutzt -> Doku (folgt noch) im Admin Bereich 
				HelperInstance.removeAllTextNodes(ulUser) //Alle Text-Elemente werden entfernt um im nächsten Schritt zu überprüfen, ob ulUser und ulExpected gleich sind
				boolean = HelperInstance.htmlDifferences(ulExpect, ulUser); //Es wird überprüft ob Node des Users mit dem Erwarteten Node übereinstimmt //return boolean
			}

			//diese Methode erwatet das boolean = true ist. 
			asset.ok(boolean, 'Sind Sie sicher, dass Sie eine <ul>-Liste mit einem <li>-Element haben?'); //Dieser String wird dem User als Fehlermeldung angezeigt, falls der Test fehlschlägt
			asset.end();
		});
		 
		//Jeder Run muss ein erfülltes Promise zurückgeben.
		return Promise.resolve();
	}

	self.run2 = (htmlNode, cssString, test, h, HelperInstance) => {
		//Es kann bei bedarf self.run1 nochmals aufgerufen werden, um zu überprüfen ob das <ul>-Element mit erwarteter Struktur auch wirklich vorhanden ist 
		self.run1(htmlNode, cssString, test, h, HelperInstance) 

		test('<li> should be blue', { //hier wird beschrieben, was der Test testen soll
		  dom: htmlNode, //HTML Node wird dem Test übergeben
		  styles: cssString, //cssString wird dem Test übergeben 
		}, (asset) => {

			//Diese Methode vergleicht, ob Variable 1 == Variable 2
		  asset.equal(
		    getComputedStyle(htmlNode.querySelector('li')).getPropertyValue('background-color'), //Das <li>-Element wird querySelected 
		    'rgb(0, 0, 255)', //Das <li>-Element sollte blau als Farbe haben
		    'Sind Sie sicher, dass ihr <span>-Element eine blaube Hintergrundfarbe hat?' //Dieser String wird dem User als Fehlermeldung angezeigt, falls der Test fehlschlägt
		  );

		  asset.end();
		  // We’ve now cleaned up the place!
		});
		//Jeder Run muss ein erfülltes Promise zurückgeben.
		return Promise.resolve();
	}


