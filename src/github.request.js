/**
 * @fileOverview do all the basic request to the github api
 */

//////////////////////////////////////////////////////////////////////////////////
//		Header for plugins
//////////////////////////////////////////////////////////////////////////////////
var Github	= Github	|| require('./github.main.js')

//////////////////////////////////////////////////////////////////////////////////
//		Plugin itself
//////////////////////////////////////////////////////////////////////////////////

/**
 * get data
 * 
 * @param  {String} path	- the api path
 * @param  {Function} onLoad	- callback called when the result is loaded
 */
Github.prototype.get = function(path, onLoad){
	var github	= this
	github._requestRead('GET', path, onLoad)
}

/**
 * post data
 * 
 * @param  {String} path	- the api path
 * @param  {Function} onLoad	- callback called when the result is loaded
 */
Github.prototype.post = function(path, dataToPost, onLoad){
	var github	= this
	github._requestWrite('POST', path, dataToPost, onLoad)
}

/**
 * put data
 * 
 * @param  {String} path	- the api path
 * @param  {Function} onLoad	- callback called when the result is loaded
 */
Github.prototype.put = function(path, dataToPost, onLoad){
	var github	= this
	github._requestWrite('PUT', path, dataToPost, onLoad)
}

/**
 * delete data
 * 
 * @param  {String} path	- the api path
 * @param  {Function} onLoad	- callback called when the result is loaded
 */
Github.prototype.delete = function(path, dataToPost, onLoad){
	var github	= this
	github._requestWrite('DELETE', path, dataToPost, onLoad)
}


//////////////////////////////////////////////////////////////////////////////////
//		Comment								
//////////////////////////////////////////////////////////////////////////////////

/**
 * Perform a READ on github API
 * 
 * @param  {String} method	- "POST" "PUT" "DELETE" this kindof thing
 * @param  {String} path	- the api path
 * @param  {Function} onLoad	- callback called when the result is loaded
 */
Github.prototype._requestRead = function(method, path, onLoad){
	var github	= this

	//////////////////////////////////////////////////////////////////////////////////
	//		check userBlacklist
	//////////////////////////////////////////////////////////////////////////////////

	console.assert(this.profile.username === 'supereditor', 'Only supereditor github user!')

	if( this.userBlacklistContains(this.profile.username) ){
		console.assert(false, 'current user is in userBlacklist.' + this.profile.name);
		throw 'USER IN githubapi.js BLACKLIST'
	}

	//////////////////////////////////////////////////////////////////////////////////
	//		Comment								//
	//////////////////////////////////////////////////////////////////////////////////
	var inNode	= typeof(window) === 'undefined' ? true : false;
	if( inNode === false ){
		path	+= '?access_token=' + github.accessToken

		var url	= 'https://api.github.com'
		url	+= path

		// log the event
		// console.log('GITHUB', method, path)

		var request	= new XMLHttpRequest();
		request.onload	= function() {
			var content	= request.responseText
			var json	= JSON.parse(content)
			// console.log('response')
			// console.dir(json)
			onLoad(json)
		};
		request.open(method, url, true);
		request.send();	
		return
	}
	//////////////////////////////////////////////////////////////////////////////////
	//		Comment								//
	//////////////////////////////////////////////////////////////////////////////////

	// request options
	var options	= {
		host	: "api.github.com",
		headers	: {
			'User-Agent': 'threex.gameeditor UserAgent',
		},
		path	: path + '?access_token=' + github.accessToken,
		method	: method,
	}

	// log the event
	console.log('GITHUB', options.method, options.path)

	// do the request
	var request	= require('https').request(options, function(httpResponse) {
		var data	= '';
		httpResponse.setEncoding('utf8');
		httpResponse.on('data', function (chunk) {
			data	+= chunk;
		});
		httpResponse.on('end', function () {
			var json	= JSON.parse(data)
			onLoad(json)
		});
	});
	// end the request
	request.end();
}

//////////////////////////////////////////////////////////////////////////////////
//		Comment								//
//////////////////////////////////////////////////////////////////////////////////


/**
 * Perform a WRITE on github API
 * 
 * @param  {String} 		method		- "POST" "PUT" "DELETE" this kindof thing
 * @param  {String} 		path		- the api path
 * @param  {Object|String}	dataToPost	- the data to send along
 * @param  {Function} 		onLoad     	- callback notified when the result is loaded
 */
Github.prototype._requestWrite = function(method, path, dataToPost, onLoad){
	var github	= this

	// handle arguments poly morphing
	if( typeof(dataToPost) !== 'string'){
		dataToPost	= JSON.stringify(dataToPost)
	}

	//////////////////////////////////////////////////////////////////////////////////
	//		check userBlacklist
	//////////////////////////////////////////////////////////////////////////////////

	console.assert(this.profile.username === 'supereditor', 'Only supereditor github user!')

	if( this.userBlacklistContains(this.profile.username) ){
		console.assert(false, 'current user is in userBlacklist.' + this.profile.name);
		throw 'USER IN githubapi.js BLACKLIST'
	}

	//////////////////////////////////////////////////////////////////////////////////
	//		Comment								//
	//////////////////////////////////////////////////////////////////////////////////
	var inNode	= typeof(window) === 'undefined' ? true : false;
	if( inNode === false ){
		path	+= '?access_token=' + github.accessToken

		var url	= 'https://api.github.com'
		url	+= path

		// log the event
		// console.log('GITHUB', method, path)

		var request	= new XMLHttpRequest();
		request.onload	= function() {
			var content	= request.responseText
			var json	= JSON.parse(content)
			// console.log('response')
			// console.dir(json)
			onLoad(json)
		};
		request.open(method, url, true);
		// request.setRequestHeader("Content-length", dataToPost.length);
		// request.setRequestHeader("Connection", "close");
		request.send(dataToPost);	
		return
	}
	//////////////////////////////////////////////////////////////////////////////////
	//		Comment								//
	//////////////////////////////////////////////////////////////////////////////////

	// request options
	var options	= {
		host	: "api.github.com",
		headers	: {
			'User-Agent'	: 'threex.gameeditor UserAgent',
			'Content-Type'	: 'application/json',
			'Content-Length': dataToPost.length,
		},

		path	: path+ '?access_token=' + github.accessToken,
		method	: method,
	}

	// log the event
	console.log('GITHUB', options.method, options.path)

	// do the request
	var request	= require('https').request(options, function(httpResponse) {
		var data	= '';
		httpResponse.setEncoding('utf8');
		httpResponse.on('data', function (chunk) {
			data += chunk;
		});
		httpResponse.on('end', function () {
			if( data.length > 0 ){
				onLoad(JSON.parse(data))
			}else{
				onLoad(data)
			}
		});
	});

	// actually post the data
	request.write(dataToPost);

	// end the request
	request.end();
}
