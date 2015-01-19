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
