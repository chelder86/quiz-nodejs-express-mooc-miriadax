var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
//@ch var users = require('./routes/users');

//@ch 
var partials = require('express-partials'); 

//@ch
var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//@ch app.use se utilizada para instalar middlewares (MW)
// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//app.use(cookieParser());
app.use(cookieParser('MQuiz 2015')); //@ch texto semilla para cifrar cookie
app.use(session());

app.use(express.static(path.join(__dirname, 'public')));

//@ch MW del paquete express-partials
app.use(partials());


// @ch Helpers dinámicos
app.use(function (req, res, next){

// Guarda ruta actual para redireccionar a esta después de hacer login
if (!req.path.match(/\/login|\/logout/)){
    req.session.redir = req.path;
}

// Copia sesión para que esté accesible desde req.session y res.locals.session
res.locals.session = req.session;
next();

});



app.use('/', routes);
//@ch app.use('/users', users);

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
