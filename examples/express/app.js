var express 	= require('express');
var path	= require('path');
var favicon	= require('serve-favicon');
var logger	= require('morgan');
var cookieParser= require('cookie-parser');
var bodyParser	= require('body-parser');
var app		= express();

//////////////////////////////////////////////////////////////////////////////////
//		Comment								//
//////////////////////////////////////////////////////////////////////////////////

// for experimentation
// var cors = require('cors')
// app.use(cors());

var initGithubAuth	= require('./app_initgithubauth')
initGithubAuth.init(app)


// TODO this example is useless
app.use('/github-rest-example' , require('./routes/githubapi-rest-example'));


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
	response.redirect('/auth?backUrl='+request.originalUrl);
}
app.use('/useGithubAPI', isAuthenticated, require('./routes/useGithubAPI'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
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
