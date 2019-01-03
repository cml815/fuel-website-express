'use strict';

const createError = require('http-errors');
const express = require('express');
const favicon = require('serve-favicon')
const expressValidator = require('express-validator')
const path = require('path');
const stylus = require('stylus');
const nib = require('nib');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const helmet = require('helmet');

// const { body,validationResult } = require('express-validator/check');
// const { sanitizeBody } = require('express-validator/filter');

const routes = require('./routes/index');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const portfolioRouter = require('./routes/portfolio');

const app = express();

app.use(helmet());

// Set up mongoose connection

var dev_db_url = 'mongodb://m***:password@ds241723.mlab.com:41723/fuelport'
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(expressValidator());
// app.use('/api', router);
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/portfolio', portfolioRouter);

app.post('/portfolio', function(req, res) {
  res.send(req.body);
});

// catch 404 and forward to error handler

/* app.use(function(req, res, next) {
  next(createError(404));
}); */

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
