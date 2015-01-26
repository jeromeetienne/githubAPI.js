var express 	= require('express');
var path	= require('path');
var favicon	= require('serve-favicon');
var logger	= require('morgan');
var cookieParser= require('cookie-parser');
var bodyParser	= require('body-parser');
var app		= express();

//////////////////////////////////////////////////////////////////////////////////
//		init github auth
//////////////////////////////////////////////////////////////////////////////////

// init sessions
var expressSession      = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));

// parameters passed to JSON.stringify for response.json()
app.set('json spaces', '\t');
app.set('json replacer', null);

// init github authentication
var initGithubAuth	= require('./app_initgithubauth')

// the options to use for passportjs GithubStrategy
// - see details at https://github.com/jaredhanson/passport-github#configure-strategy
var githubStrategyOpts	= {
	// keys from github app - PUT YOUR OWN
	// - see https://github.com/settings/applications and click 'register new application'
	clientID	: require('./app_github_key').clientID,
	clientSecret	: require('./app_github_key').clientSecret,
	
	// callback url for oauth
	callbackURL	: 'http://127.0.0.1:8000/github-auth/callback',

	// scope	: 'delete_repo, repo', 
	scope		: 'repo', 
}
initGithubAuth.init(app, githubStrategyOpts)

//////////////////////////////////////////////////////////////////////////////////
//		Comments
//////////////////////////////////////////////////////////////////////////////////

// TODO this example is useless
app.use('/githubapi-rest-example' , require('./routes/githubapi-rest-example'));


////////////////////////////////////////////////////////////////////////////////
//
////////////////////////////////////////////////////////////////////////////////     

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.engine('ejs', require('ejs-locals'))
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// var routes = require('./routes/index');
// app.use('/', routes);




// As with any middleware it is quintessential to call next()
// if the user is authenticated
var isAuthenticated = function (request, response, next) {
	if( request.isAuthenticated() )
		return next();
	response.redirect('/github-auth?backUrl='+request.originalUrl);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found. for '+req.url);
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
	    message: err.message,
	    error: err
	});
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
	message: err.message,
	error: {}
    });
});


module.exports = app;
