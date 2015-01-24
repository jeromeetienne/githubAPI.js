/**
 * Build the tool itself
 * 
 * @param {String} accessToken - the access token you got from authentication
 * @param {Object} profile     - the profile of your user from github
 */
var Github	= function(accessToken, profile){
	this.accessToken	= accessToken
	this.profile		= profile

	console.assert(this.profile.username === 'supereditor', 'username'+this.profile.username)
}

/**
 * Export it in node.js
 * 
 * @type {Github}
 */
if( typeof(window) === 'undefined' )	module.exports	= Github;

//////////////////////////////////////////////////////////////////////////////////
//		gowiththeflow.js
//////////////////////////////////////////////////////////////////////////////////

/**
 * Build a flow to handle asynchronous data flow
 * gowiththeflow.js - https://github.com/jeromeetienne/gowiththeflow.js
 */
Github.Flow	= function(){
	var self, stack = [], timerId = setTimeout(function(){ timerId = null; self._next(); }, 0);
	return self = {
		destroy : function(){ timerId && clearTimeout(timerId); },
		par	: function(callback, isSeq){
			if(isSeq || !(stack[stack.length-1] instanceof Array)) stack.push([]);
			stack[stack.length-1].push(callback);
			return self;
		},seq	: function(callback){ return self.par(callback, true);	},
		_next	: function(err, result){
			var errors = [], results = [], callbacks = stack.shift() || [], nbReturn = callbacks.length, isSeq = nbReturn == 1;
			for(var i = 0; i < callbacks.length; i++){
				(function(fct, index){
					fct(function(error, result){
						errors[index]	= error;
						results[index]	= result;		
						if(--nbReturn == 0)	self._next(isSeq?errors[0]:errors, isSeq?results[0]:results)
					}, err, result)
				})(callbacks[i], i);
			}
		}
	}
};//////////////////////////////////////////////////////////////////////////////////
//		Header for plugins
//////////////////////////////////////////////////////////////////////////////////
var Github	= Github	|| require('./github.main.js')

//////////////////////////////////////////////////////////////////////////////////
//		Plugin itself
//////////////////////////////////////////////////////////////////////////////////
/**
 * get all repositories
 * @param  {function} onLoad - callback called on load
 */
Github.prototype.getRepos	= function(onLoad){
	var urlGet	= '/user/repos'
	var github	= this
	github.get(urlGet, onLoad)
};


/**
 * https://developer.github.com/v3/repos/#create
 */
Github.prototype.createRepo = function(repoName, onLoad){
	// sanity check
	console.assert(this.profile.username === 'supereditor', 'Only supereditor github user!')

	var github	= this

	// build stuff to make the api call
	var dataToPost	= {
		name		: repoName,
		description	: 'silly repository description',
  	}

	var path	= '/user/repos'
	github.post(path, dataToPost, function(data){
		onLoad(data)
	})
}

/**
 * https://developer.github.com/v3/repos/#delete-a-repository
 *
 * - require scope 'delete_repo'
 */
Github.prototype.deleteRepo = function(repoName, onLoad){
	// sanity check
	console.assert(this.profile.username === 'supereditor', 'Only supereditor github user!')

	var github	= this

	// build stuff to make the api call
	var dataToPost	= {}

	var path	= '/repos/'+github.profile.username+'/'+repoName
	github.delete(path, dataToPost, function(data){
		onLoad(data)
	})
}

//////////////////////////////////////////////////////////////////////////////////
//		Header for plugins
//////////////////////////////////////////////////////////////////////////////////
var Github	= Github	|| require('./github.main.js')

//////////////////////////////////////////////////////////////////////////////////
//		Plugin itself
//////////////////////////////////////////////////////////////////////////////////
/**
 * https://developer.github.com/v3/repos/contents/#update-a-file
 */
Github.prototype.createOrUpdateFile = function(repoName, path, message, content, onLoad){
	// sanity check
	console.assert(this.profile.username === 'supereditor', 'Only supereditor github user!')

	var github	= this

	Github.Flow().seq(function(next){
		var apiPath	= '/repos/'+github.profile.username+'/'+repoName+'/contents/'+path
		// first get the file to get the sha of the content of the file
		// - it is required to update a file in github api
		// - dont ask.... i dunno. to force to download before upload.. super efficient
		github.get(apiPath, function(data){
			console.log('createOrUpdateFile get content')
			console.dir(data)
			// console.assert(false)
			next(data)
		})
	}).seq(function(next, result, error){
		var githubFile	= result
		// build stuff to make the api call
		var dataToPost	= {
			message	: message,
			content	: base64Encode(content),
			// content	: content,
			sha	: githubFile.sha,
	  	}
	  	// do the actual call
		var apiPath	= '/repos/'+github.profile.username+'/'+repoName+'/contents/'+path
		github._requestWrite('PUT', apiPath, dataToPost, function(data){
			onLoad(data)
		})
	})

	return

	function base64Encode(content){
		var inNode	= typeof(window) === 'undefined' ? true : false;
		if( inNode ){
			return new Buffer(content).toString('base64')
		}else{
			// // from http://scotch.io/quick-tips/js/how-to-encode-and-decode-strings-with-base64-in-javascript
			// // Create Base64 Object
			// var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
			// return Base64.encode(content)

			// return window.btoa(unescape(encodeURIComponent( content )))
			return window.btoa(content)
		}

		// Create Base64 Object
		var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
	}


};


Github.prototype.deleteRecursive	= function(repoName, path, onLoad){
	var github	= this;
	github.filesList(repoName, path, function(filesPath){
		// delete all files
		var flow	= Github.Flow()
		filesPath.forEach(function(filePath){
			flow.seq(function(next){
				github.deleteFile(repoName, filePath, 'reccursive delete', function(){
					next()
				})
			})
		})
		// when all folders are fetch, return this node
		flow.seq(function(next){
			onLoad("all done!")
		})
	})
}


/**
 * get a list of all the file at rootPath
 * 
 * @param  {String} repoName - the name of the repository
 * @param  {String} rootPath - the root path where to start, likely '' for the whole thing
 * @param  {Function} onLoad - callback called once data are loaded
 */
Github.prototype.filesList = function(repoName, rootPath, onLoad){
	var github	= this;
	var filesList	= []

	// start fetching files at the root
	getNode(filesList, rootPath, function(data){
		onLoad(filesList)
	})

	return

	// fetch files reccursively
	function getNode(filesList, path, onLoad){
		// console.log('getNode path', path)
		github.getContent(repoName, path, function(data){
			var items	= data
			// build the node.files object
			items.forEach(function(item){
				if( item.type === 'file' ){
					var fullName	= path + (path?'/':'') + item.name
					filesList.push(fullName)
				}else if( item.type === 'dir' ){
				}else	console.assert(false)
			})
			// fetch all folders reccursively
			var flow	= Github.Flow()
			items.forEach(function(item){
				if( item.type !== 'dir' )	return
				flow.seq(function(next){
					var fullName	= path + (path?'/':'') + item.name
					getNode(filesList, fullName, function(child){
						// node.folders[item.name]	= child
						next()
					})
				})
			})
			// when all folders are fetch, return this node
			flow.seq(function(next){
				onLoad()
			})
		})		
	}

}

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
	console.assert(this.profile.username === 'supereditor', 'Only supereditor github user!')

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

	console.assert(this.profile.username === 'supereditor', 'Only supereditor github user!')
	if( typeof(dataToPost) !== 'string'){
		dataToPost	= JSON.stringify(dataToPost)
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
/**
 * a quite wonderful function
 * @param {object} - privacy gown
 * @param {object} - security
 * @returns {survival}
*/
function protection(cloak, dagger){}

//////////////////////////////////////////////////////////////////////////////////
//		Header for plugins
//////////////////////////////////////////////////////////////////////////////////

/**
 * 
 * @class
 */
var Github	= Github	|| require('./github.main.js')

//////////////////////////////////////////////////////////////////////////////////
//		Plugin itself
//////////////////////////////////////////////////////////////////////////////////

/**
 * get contents - https://developer.github.com/v3/repos/contents/#get-contents
 *
 * @param {String} repoName - the repository name
 * @param {String} path - the path to the content
 * @param  {function} onLoad - callback called on load
 */
Github.prototype.getContent = function(repoName, path, onLoad){
	var urlGet	= '/repos/'+this.profile.username+'/'+repoName+'/contents/'+path
	var github	= this
	github.get(urlGet, onLoad)
};

/**
 * get contents - https://developer.github.com/v3/repos/contents/#get-contents
 *
 * @param {String} repoName - the repository name
 * @param {String} path - the path to the content
 * @param  {function} onLoad - callback called on load
 */
Github.prototype.getContent = function(repoName, path, onLoad){
	var urlGet	= '/repos/'+this.profile.username+'/'+repoName+'/contents/'+path
	var github	= this
	github.get(urlGet, onLoad)
};


/**
 * get README - https://developer.github.com/v3/repos/contents/#get-the-readme
 *
 * @param {String} repoName - the repository name
 * @param  {function} onLoad - callback called on load
 */
Github.prototype.getReadme = function(repoName, onLoad){
	var urlGet	= '/repos/'+this.profile.username+'/'+repoName+'/readme'
	var github	= this
	github.get(urlGet, onLoad)
};


/**
 * https://developer.github.com/v3/repos/contents/#create-a-file
 * 
 * @param  {type} repoName [description]
 * @param  {type} path     [description]
 * @param  {type} message  [description]
 * @param  {type} content  [description]
 * @param  {type} onLoad   [description]
 * @return {type}          [description]
 */
Github.prototype.createFile = function(repoName, path, message, content, onLoad){
	// sanity check
	console.assert(this.profile.username === 'supereditor', 'Only supereditor github user!')

	github.checkUserBlacklist()

	var github	= this

	// build stuff to make the api call
	var dataToPost	= {
		message	: message,
		content	: new Buffer(content).toString('base64'),
  	}

	var putUrl	= '/repos/'+github.profile.username+'/'+repoName+'/contents/'+path
	github._requestWrite('PUT', putUrl, dataToPost, function(data){
		onLoad(data)
	})
};

/**
 * https://developer.github.com/v3/repos/contents/#update-a-file
 */
Github.prototype.updateFile = function(repoName, path, message, content, onLoad){
	// sanity check
	console.assert(this.profile.username === 'supereditor', 'Only supereditor github user!')

	var github	= this

	Github.Flow().seq(function(next){
		var apiPath	= '/repos/'+github.profile.username+'/'+repoName+'/contents/'+path
		// first get the file to get the sha of the content of the file
		// - it is required to update a file in github api
		// - dont ask.... i dunno. to force to download before upload.. super efficient
		github.get(apiPath, function(data){
			// TODO detect if it fails here
			// - it seems to go thru even if the file isnt there
			next(data)
		})
	}).seq(function(next, result, error){
		var githubFile	= result
		// build stuff to make the api call
		var dataToPost	= {
			message	: message,
			content	: new Buffer(content).toString('base64'),
			sha	: githubFile.sha,
	  	}
	  	// do the actual call
		var apiPath	= '/repos/'+github.profile.username+'/'+repoName+'/contents/'+path
		github._requestWrite('PUT', apiPath, dataToPost, function(data){
			onLoad(data)
		})
	})
};


/**
 * https://developer.github.com/v3/repos/contents/#delete-a-file
 */
Github.prototype.deleteFile = function(repoName, path, message, onLoad){
	// sanity check
	console.assert(this.profile.username === 'supereditor', 'Only supereditor github user!')

	var github	= this

	Github.Flow().seq(function(next){
		var apiPath	= '/repos/'+github.profile.username+'/'+repoName+'/contents/'+path
		// first get the file to get the sha of the content of the file
		// - it is required to update a file in github api
		// - dont ask.... i dunno. to force to download before upload.. super efficient
		github.get(apiPath, function(data){
			// onLoad(data)
			// FIXME: if the file doesnt exist ?
			next(data)
		})
	}).seq(function(next, result, error){
		var githubFile	= result
		// build stuff to make the api call
		var dataToPost	= {
			message	: message,
			sha	: githubFile.sha,
	  	}
	  	// do the actual call
		var apiPath	= '/repos/'+github.profile.username+'/'+repoName+'/contents/'+path
		github._requestWrite('DELETE', apiPath, dataToPost, function(data){
			onLoad(data)
		})
	})
};
//////////////////////////////////////////////////////////////////////////////////
//		Header for plugins
//////////////////////////////////////////////////////////////////////////////////
var Github	= Github	|| require('./github.main.js')

//////////////////////////////////////////////////////////////////////////////////
//		Plugin itself
//////////////////////////////////////////////////////////////////////////////////

/**
 * https://developer.github.com/v3/repos/forks/#create-a-fork
 */
Github.prototype.createFork = function(forkOwner, forkRepoName, onLoad){
	// sanity check
	console.assert(this.profile.username === 'supereditor', 'Only supereditor github user!')

	var github	= this

	// build stuff to make the api call
	var dataToPost	= {
		// organisation	: 'toforkinoneofYourOrga'
  	}
  	
	var putUrl	= '/repos/'+forkOwner+'/'+forkRepoName+'/forks'
	github._requestWrite('POST', putUrl, dataToPost, function(data){
		onLoad(data)
	})
}
/**
 * @fileOverview contains the mechanism to have a hardcoded blacklist
 * 
 * - thus when you develop you make sure the library only use the account made for testing
 * - and thus this avoid catastroph to happen :)
 */

//////////////////////////////////////////////////////////////////////////////////
//		Header for plugins
//////////////////////////////////////////////////////////////////////////////////
var Github	= Github	|| require('./github.main.js')

//////////////////////////////////////////////////////////////////////////////////
//                Comments
//////////////////////////////////////////////////////////////////////////////////        

/**
 * user blacklist
 * 
 * @type {String[]}
 */
Github.userBlackList   = []

/**
 * test if the username is in the user blacklist
 * @param {String} userName - the username
 */
Github.prototype.checkUserBlacklist = function(userName){
        return  Github.userBlackList.indexOf(userName) !== -1 ? false : true
}
