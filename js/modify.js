var capturer = new Capturer();

capturer.addCallback(function(doc){
	console.log("Any callback that is added to the capturer will be executed during the capture phase.");
	console.log("For example, the function that is writing this is running in the capture phase.");
	console.log("It has access to the captured document: ");
	console.log(doc);
	console.log("... while the actual document looks a bit like giberrish right now: ");
	console.log({innerHTML: document.body.innerHTML});
	console.log("After all callbacks finish modifying the captured document, in the order they were added to");
	console.log("the capturer, the actual document will be replaced by a rendered version of the captured document.");
});

capturer.addCallback(function(doc){
	var imgs = doc.getElementsByTagName("img");
	for(var i = 0; i < imgs.length; i++){
		var img = imgs[i];
		img.src = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSoyS6GIJv38cxuHr9rlI7PMR_oq7uIZqyyn9Fgfc-b4eKR-ldZ"
	}
});

capturer.capture();

capturer.render();