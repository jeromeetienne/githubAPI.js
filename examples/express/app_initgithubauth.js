/**
 * @file init github authentication with passport.js
 *
 * - FIXME this should match some kind of standard if possible
 *   - what about 'connect middleware'
 *   - could that be that
 */


// TODO this is very much like a /routes

exports.init	= function(app, githubStrategyOpts){

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
	passport.use(new GithubStrategy(githubStrategyOpts, function(accessToken, refreshToken, profile, done){
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
	app.use('/github-auth', require('./routes/github-auth'));
}
