var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const dotenv = require("dotenv");
var app = express();


const pg = require('pg');
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);

const pgPool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        ssl: true,
        rejectUnauthorized: false
    }
});

pgPool.connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressSession({
    store: new pgSession({
      pool : pgPool                // Connection pool
         // Use another table-name than the default "session" one
      // Insert connect-pg-simple options here
    }),
    secret: process.env.FOO_COOKIE_SECRET,
    resave: false,
    expired: {
        clear: true,
        intervalMs: 1000 * 60 * 60 * 24 //ms = 24 hours
    },
    cookie: { 
        secure: true,
        sameSite: true,
        maxAge: 30 * 24 * 60 * 60 * 1000 
    },
    resave: false,
    saveUninitialized: false
    // Insert express-session options here
}));
// app.use(session({
//     store: new (require('connect-pg-simple')(session))({
//     // Insert connect-pg-simple options here
//     }),
//     secret: process.env.FOO_COOKIE_SECRET,
//     resave: false,
//     expired: {
//         clear: true,
//         intervalMs: 1000 * 60 * 60 * 24 //ms = 24 hours
//     },
//     cookie: { 
//         maxAge: 30 * 24 * 60 * 60 * 1000,
//         secure: true,
//         sameSite: true 
//     },
//     resave: false,
//     saveUninitialized: false
//     // Insert express-session options here
// }));

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