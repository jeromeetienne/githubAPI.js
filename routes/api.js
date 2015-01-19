var router	= require('express').Router()
module.exports	= router

var Github	= require('../githubAPI/index.js')

//////////////////////////////////////////////////////////////////////////////////
//		Comment								//
//////////////////////////////////////////////////////////////////////////////////
router.get('/forkRepository', function(request, response) {
	if( request.isAuthenticated() === false ){
		// response.redirect('/auth?backUrl='+request.originalUrl);
		response.status(403).send('Forbidden. You MUST be authenticated!\n');
		return
	}
	// sanity check
	console.assert(request.user.profile.username === 'supereditor', 'Only supereditor github user!')

	// get parameters
	var forkOwner	= request.query.forkOwner
	var forkRepo	= request.query.forkRepo

	//////////////////////////////////////////////////////////////////////////////////
	//		actually do the work
	//////////////////////////////////////////////////////////////////////////////////
	var github	= new Github(request.user.accessToken, request.user.profile)
	github.createFork(forkOwner, forkRepo,function(data){
		response.json(data)
	})
});


//////////////////////////////////////////////////////////////////////////////////
//		Comment								//
//////////////////////////////////////////////////////////////////////////////////

router.get('/deleteRepository', function(request, response) {
	if( request.isAuthenticated() === false ){
		// response.redirect('/auth?backUrl='+request.originalUrl);
		response.status(403).send('Forbidden. You MUST be authenticated!\n');
		return
	}
	// sanity check
	console.assert(request.user.profile.username === 'supereditor', 'Only supereditor github user!')


	// get parameters
	var repoName	= request.query.repoName
	var repoOwner	= request.query.repoOwner

	//////////////////////////////////////////////////////////////////////////////////
	//		Error report
	//////////////////////////////////////////////////////////////////////////////////
	if( !repoName ){
		response.status(400).send('Bad Request. Sorry, you MUST provide a repoName variable in query.\n');
		return
	}
	if( !repoOwner ){
		response.status(400).send('Bad Request. Sorry, you MUST provide a repoOwner variable in query.\n');
		return
	}


	// check repoOwner is the authenticated user
	// - it is to make sure the caller know which repo is gonna be deleted
	if( repoOwner !== request.user.profile.username ){
		response.status(403).send('Forbidden. You can only delete your own project!\n');
		return
	}

	//////////////////////////////////////////////////////////////////////////////////
	//		actually do the work
	//////////////////////////////////////////////////////////////////////////////////
	var github	= new Github(request.user.accessToken, request.user.profile)
	github.deleteRepo(repoName,function(data){
		response.json(data)
	})
});

//////////////////////////////////////////////////////////////////////////////////
//		Comment								//
//////////////////////////////////////////////////////////////////////////////////


router.get('/createOrUpdateData', function(request, response) {
	if( request.isAuthenticated() === false ){
		// response.redirect('/auth?backUrl='+request.originalUrl);
		response.status(403).send('Forbidden. You MUST be authenticated!\n');
		return
	}
	// sanity check
	console.assert(request.user.profile.username === 'supereditor', 'Only supereditor github user!')

	// get parameters
	var repoName	= request.query.repoName
	var path	= request.query.path
	var content	= request.query.content

	//////////////////////////////////////////////////////////////////////////////////
	//		Error report
	//////////////////////////////////////////////////////////////////////////////////
	if( !repoName )	{
		response.status(400).send('Bad Request. Sorry, you MUST provide a repoName variable in query.\n');
		return
	}
	if( !path ){
		response.status(400).send('Bad Request. Sorry, you MUST provide a path variable in query.\n');
		return
	}
	if( !content ){
		response.status(400).send('Bad Request. Sorry, you MUST provide a content variable in query.\n');
		return
	}

	//////////////////////////////////////////////////////////////////////////////////
	//		actually do the work
	//////////////////////////////////////////////////////////////////////////////////
	var message	= 'Super commit message'
	var github	= new Github(request.user.accessToken, request.user.profile)
	github.createOrUpdateFile(repoName, path, message, content,function(data){
		response.json(data)
	})
});

//////////////////////////////////////////////////////////////////////////////////
//		Comment								//
//////////////////////////////////////////////////////////////////////////////////


router.get('/deleteFile', function(request, response) {
	if( request.isAuthenticated() === false ){
		// response.redirect('/auth?backUrl='+request.originalUrl);
		response.status(403).send('Forbidden. You MUST be authenticated!\n');
		return
	}
	// sanity check
	console.assert(request.user.profile.username === 'supereditor', 'Only supereditor github user!')

	// get parameters
	var repoName	= request.query.repoName
	var path	= request.query.path

	//////////////////////////////////////////////////////////////////////////////////
	//		Error report
	//////////////////////////////////////////////////////////////////////////////////
	if( !repoName )	{
		response.status(400).send('Bad Request. Sorry, you MUST provide a repoName variable in query.\n');
		return
	}
	if( !path ){
		response.status(400).send('Bad Request. Sorry, you MUST provide a path variable in query.\n');
		return
	}

	//////////////////////////////////////////////////////////////////////////////////
	//		actually do the work
	//////////////////////////////////////////////////////////////////////////////////
	var github	= new Github(request.user.accessToken, request.user.profile)
	github.deleteFile(repoName, path, 'deleting a file', function(data){
		response.json(data)
	})
});

