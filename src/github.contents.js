//////////////////////////////////////////////////////////////////////////////////
//		Header for plugins
//////////////////////////////////////////////////////////////////////////////////

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
 * @param  {String} repoName - the name of the repository
 * @param  {String} path     - the path of the file
 * @param  {String} message  - the commit message
 * @param  {String} content  - the file content
 * @param  {function} onLoad - the callback to notify on completion
 */
Github.prototype.createFile = function(repoName, path, message, content, onLoad){
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
 * Update file 
 * 
 * - see details at https://developer.github.com/v3/repos/contents/#update-a-file
 */
Github.prototype.updateFile = function(repoName, path, message, content, onLoad){
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
 * Delete a file 
 * 
 * - see details on https://developer.github.com/v3/repos/contents/#delete-a-file
 */
Github.prototype.deleteFile = function(repoName, path, message, onLoad){
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
