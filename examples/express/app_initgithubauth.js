/**
 * @file init github authentication with passport.js
 *
 * - FIXME this should match some kind of standard if possible
 *   - what about 'connect middleware'
 *   - could that be that
 */


exports.init	= function(app){

	//////////////////////////////////////////////////////////////////////////////////
	//		Comment								//
	//////////////////////////////////////////////////////////////////////////////////

	// init sessions
	var expressSession      = require('express-session');
	app.use(expressSession({secret: 'mySecretKey'}));

	// parameters passed to JSON.stringify for response.json()
	app.set('json spaces', '\t');
	app.set('json replacer', null);

	////////////////////////////////////////////////////////////////////////////////
	//	init passport
	////////////////////////////////////////////////////////////////////////////////     

	// Configuring Passport
	var passport            = require('passport');
	app.use(passport.initialize());
	app.use(passport.session());

	// serialize and deserialize
	passport.serializeUser(function(user, done) {
		done(null, user);
	});
	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});

	////////////////////////////////////////////////////////////////////////////////
	//		init github strategy
	////////////////////////////////////////////////////////////////////////////////     

	// app.js
	var GithubStrategy      = require('passport-github').Strategy;
	passport.use(new GithubStrategy({
		clientID	: 'ea5914292ffcf9cab776',
		clientSecret	: 'db108ec2e53a02bda9a7162548b10587986ca9c4',
		callbackURL	: 'http://127.0.0.1:8000/auth/callback',
		// scope		: 'gist', 
		scope		: 'delete_repo, repo', 
		// scope		: 'repo', 
	}, function(accessToken, refreshToken, profile, done){
		// console.log('profile', profile)
		done(null, {
			accessToken	: accessToken,
			refreshToken	: refreshToken,
			profile		: profile
		});
	}));

	////////////////////////////////////////////////////////////////////////////////
	//	forward to proper routers
	////////////////////////////////////////////////////////////////////////////////     

	// handle multipart file uploads
	app.use('/auth', require('./routes/auth'));
}
