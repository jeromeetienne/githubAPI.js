/**
 * @file express router on top of passport.js user.
 */

var router	= require('express').Router()
module.exports	= router;

var passport            = require('passport');


//////////////////////////////////////////////////////////////////////////////////
//		Comment								//
//////////////////////////////////////////////////////////////////////////////////

router.get('/user', function(request, response) {
	if( request.user ){
		console.assert(request.user.profile.username === 'supereditor')
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
	console.log('save backUrl', request.session.backUrl)
	console.log('save session', request.session)

        next()
}, passport.authenticate('github'));

router.get('/error', function(request, response){
        response.send('Login Failed')
})

router.get('/callback',
	passport.authenticate('github', {
		failureRedirect	: '/auth/error'
	}),
	function(request, response){
		// honor ?backUrl=
		console.log('load backUrl', request.session.backUrl)
		console.log('save session', request.session)
		console.assert( request.session.backUrl )
		response.redirect(request.session.backUrl)
		request.session.backUrl	= ''

		// response.redirect('/example-serverapi.html')
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
