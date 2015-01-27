/**
 * @fileOverview - some extras helper functions on top of the core API
 */


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
// TODO remove this obsolete code
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
