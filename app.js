var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// save user session

const sqlite = require("better-sqlite3");
const SqliteStore = require("better-sqlite3-session-store")(session)
const dotenv = require("dotenv");

// Create a new database (if not exist) to store user sessions
const db = new sqlite("sessions.db", { verbose: console.log });

var sess = {
  store: new SqliteStore({
    client: db, 
    // expired: {
    //   clear: true,
    //   intervalMs: 1000 * 60 * 60 * 24 //ms = 24 hours
    // }
  }),
  // Can add secret variable from .env file later using 'dotenv'
  secret: 'keyboard cat',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: true
  },
  resave: false,
  saveUninitialized: false
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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