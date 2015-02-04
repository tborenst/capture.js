var Capturer = function(){
	this.callbacks = [];
	this.doc = null;
}

/**
 * addCallback: the callback that is passed in should take a 'doc' parameter,
 * which it can then manipulate like any other document.
 ***/
Capturer.prototype.addCallback = function(callback){
	this.callbacks.push(callback);
}

/**
 * capture: starts the capturing process.
 ***/
Capturer.prototype.capture = function(){
	// get data from plaintext
	var plaintext = document.getElementsByTagName("PLAINTEXT")[0];
	var inner = (plaintext.innerText === undefined) ? plaintext.innerHTML : plaintext.innerText;
	var html = "<head>" + inner;
	
	// reconstruct new document
	var capturedDoc = document.implementation.createHTMLDocument("Temp Title");
	capturedDoc.childNodes[1].innerHTML = html;

	// modify capturedDoc here using callbacks from global
	var modifiers = this.callbacks;
	for(var i = 0; i < modifiers.length; i++){
		var callback = modifiers[i];
		callback(capturedDoc);
	}

	this.doc = capturedDoc;
}

/**
 * render: renders the captured doc.
 ***/
Capturer.prototype.render = function(){
	var html = "<!DOCTYPE HTML><html lang='en'>" 
			 + this.doc.getElementsByTagName("html")[0].innerHTML 
			 + "</html>";
	document.open("text/html", "replace");
	document.write(html);
	document.close();
}