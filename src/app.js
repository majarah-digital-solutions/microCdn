var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler')
var bodyParser = require('body-parser');

var app = express();

app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.raw({
    inflate: true,
    limit: 1024 * 1024 * 2,
    type: 'application/octet-stream'
}));

app.use('/', require('./routes/base'));
app.use('/v2', require('./routes/v2'));

app.use(errorHandler({ dumpExceptions: true, showStack: true })); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// // error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
