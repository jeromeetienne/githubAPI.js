/**
 * read request. just an helper to read the REST api for the demo
 * 
 * @param {String} method  - the method to use GET/POST etc...
 * @param {String} callUrl - the url to use
 * @param {Function} onLoad  - the callback notified when the requestr is read
 */
var requestRead	= function(method, callUrl, onLoad){
	// log
	console.log('SERVER', method, callUrl)
	// start the request
	var request	= new XMLHttpRequest();
	request.onload	= function() {
		// parse the response
		var content	= request.responseText
		var json	= JSON.parse(content)
		// log
		console.log('Response', json)
		// notify called
		onLoad(json)
	};
	request.open(method, callUrl, true);
	request.send();	
}
