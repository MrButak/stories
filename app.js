const dotenv = require("dotenv");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




// Create a new database (if not exist) to store user sessions
// const db = new sqlite("sessions.db", { verbose: console.log });

const session = require('express-session');

app.use(session({
    store: new (require('connect-pg-simple')(session))({
    // Insert connect-pg-simple options here
    }),
    secret: process.env.FOO_COOKIE_SECRET,
    resave: false,
    expired: {
        clear: true,
        intervalMs: 1000 * 60 * 60 * 24 //ms = 24 hours
    },
    cookie: { 
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: true 
    }, // 30 days
    resave: false,
    saveUninitialized: false
    // Insert express-session options here
}));


// var sess = {
//   store: new SqliteStore({
//     client: db, 
//     expired: {
//       clear: true,
//       intervalMs: 1000 * 60 * 60 * 24 //ms = 24 hours
//     }
//   }),
//   // Can add secret variable from .env file later using 'dotenv'
//   secret: 'keyboard cat',
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24,
//     sameSite: true
//   },
//   resave: false,
//   saveUninitialized: false
// }

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

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