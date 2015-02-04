# capture.js
This library allows you to hijack the DOM and make changes to it before it gets rendered. For more details about the origin of this library, see [this blog post](http://blog.tborenst.com/).
## Usage
First, paste this snippet of code right at the top of your `<head>` tag:
```markup
<script>
	(function(captureScript, modifyScript){
		// stop the document from rendering anything else
		document.write('<plaintext style="display:none">');

		var insertBeforeCapture = function(src, onload){
			var script = document.createElement("script");
			script.src = src;
			script.onload = onload;

			document.head.appendChild(script);
		}

		// on the next tick, attach scripts to top of the head
		setTimeout(function(){
			insertBeforeCapture(captureScript, function(){
				insertBeforeCapture(modifyScript, function(){});
			});
		}, 0);
	})("./js/capture.js", "./js/modify.js");
</script>
```
Then, change the file "modify.js" and add any changes to the DOM you'd like to make like so:
```javascript
var capturer = new Capturer();

capturer.addCallback(function(doc){
	// make any changes to the document object here
}

capturer.capture();

capturer.render();
```