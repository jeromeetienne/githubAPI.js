/**
 * @file express router on top of passport.js user.
 */

var router	= require('express').Router()
module.exports	= router;

var passport	= require('passport');


//////////////////////////////////////////////////////////////////////////////////
//		Comment								//
//////////////////////////////////////////////////////////////////////////////////

router.get('/user', function(request, response) {
	if( request.user ){
		// console.assert(request.user.profile.username === 'supereditor')
		response.json({
			accessToken	: request.user.accessToken,
			profile		: request.user.profile,
		})
	}else{
		response.json(null)
	}
});

// app.js
router.get('/login', function(request, response, next){
	// honor ?backUrl=
	request.session.backUrl	= request.query.backUrl
	console.assert( request.session.backUrl )

        next()
}, passport.authenticate('github'));

router.get('/error', function(request, response){
        response.send('Login Failed')
})

router.get('/callback',
	passport.authenticate('github', {
		failureRedirect	: '/github-auth/error'
	}),
	function(request, response){
		// backup backUrl and reset it
		var backUrl	= request.session.backUrl
		request.session.backUrl	= ''

		// get username
		// - here it is assumed to be authenticated, else it goes in /error
		console.assert( request.isAuthenticated() );
		var userName	= request.user.profile.username

		// logout the user if it isBlackListed
		var Github		= require('../../../src/index.js')
		var isBlackListed	= Github.userIsBlackListed(userName)
		if( isBlackListed ){
			// logout the user 
			request.logOut()
			// return an error
			response.status(403).send('Forbidden. User "'+userName+'" is blacklisted and cant login here!\n');
			return
		}

		// honor ?backUrl=
		console.assert( backUrl )
		response.redirect(backUrl)
	}
);

router.get('/logout', function(request, response){
	// logout the user
	if( request.isAuthenticated() ){
		request.logOut()
	}

	// honor ?backUrl= 
	console.assert(request.query.backUrl)
	var backUrl 	= request.query.backUrl
	response.redirect(backUrl);
})
