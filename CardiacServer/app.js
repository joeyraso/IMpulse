var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var exphbs = require('express-handlebars'); // handlebars templates
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var MONGODB_URI;
if (app.get('env') === 'development') {
  MONGODB_URI = "mongodb://arresteddevelopment:saveme@ds029436.mlab.com:29436/heroku_b9m24fb8";
} else {
  MONGODB_URI = process.env.MONGODB_URI
}

mongoose.connect(MONGODB_URI);
mongoose.connection.on('error', function(e) {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// set handlebars as template engine
app.engine('.hbs', exphbs({defaultLayout: 'default', extname: '.hbs'}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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
