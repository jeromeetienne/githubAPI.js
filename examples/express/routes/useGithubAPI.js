/**
 * @file sample usage of githubAPI.js on top 
 */

var router	= require('express').Router();
module.exports	= router;

// require githubAPI.js
var Github	= require('../../../src/index.js')

/* GET home page. */
router.get('/createFile', function(request, response) {
	var github	= new Github(request.user.accessToken, request.user.profile)

	var repoName	= 'threex.project.sampleproject'

	github.createFile(repoName, 'prout1.md', 'a initial commit message', 'an dummy file content', function(data){
		response.json(data)
	})
});

router.get('/updateFile', function(request, response) {
	var github	= new Github(request.user.accessToken, request.user.profile)

	var repoName	= 'threex.project.sampleproject'

	github.updateFile(repoName, 'prout1.md', 'a commit update message', 'an dummy file content '+Date(), function(data){
		response.json(data)
	})
});


router.get('/deleteFile', function(request, response) {
	var github	= new Github(request.user.accessToken, request.user.profile)

	var repoName	= 'threex.project.sampleproject'

	github.deleteFile(repoName, 'prout1.md', 'deleting a file', function(data){
		response.json(data)
	})
});


router.get('/createOrUpdateFile', function(request, response) {
	var github	= new Github(request.user.accessToken, request.user.profile)

	var repoName	= 'threex.project.sampleproject'

	var path	= 'prout1.md'
	var commit	= 'a commit update message'
	var content	= 'a dummy file content '+Date()
	github.createOrUpdateFile(repoName, path, commit, content, function(data){
		response.json(data)
	})
});


router.get('/filesList', function(request, response) {
	var github	= new Github(request.user.accessToken, request.user.profile)

	var repoName	= 'threex.project.sampleproject'

	github.filesList(repoName, '', function(data){
		response.json(data)
	})
});


router.get('/projectFiles', function(request, response) {
	var github	= new Github(request.user.accessToken, request.user.profile)

	var repoName	= 'threex.project.sampleproject'

	github.getProjectFiles(repoName, function(data){
		response.json(data)
	})
});

router.get('/getReadme', function(request, response) {
	var github	= new Github(request.user.accessToken, request.user.profile)

	var repoName	= 'threex.project.sampleproject'

	github.getReadme(repoName, function(data){
		var content	= new Buffer(data.content, 'base64').toString()
		response.contentType('text/plain');
		response.send(content)
	})
});


router.get('/deleteRecursive', function(request, response) {
	var github	= new Github(request.user.accessToken, request.user.profile)

	var repoName	= 'threex.project.sampleproject'

	github.deleteRecursive(repoName, 'examples', function(data){
		response.json(data)
	})
});



router.get('/repos', function(request, response) {
	var github	= new Github(request.user.accessToken, request.user.profile)

	var repoName	= 'threex.project.sampleproject'

	github.getRepos(function(data){
		response.json(data)
	})
});

router.get('/createFork', function(request, response) {
	var github	= new Github(request.user.accessToken, request.user.profile)

	var repoName	= 'threex.project.sampleproject'

	github.createFork('mrdoob','three.js',function(data){
		response.json(data)
	})
});

router.get('/deleteRepo', function(request, response) {
	var github	= new Github(request.user.accessToken, request.user.profile)

	var repoName	= 'threex.project.sampleproject'

	github.deleteRepo('three.js',function(data){
		response.json(data)
	})
});
