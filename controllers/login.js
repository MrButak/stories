const logIn = require("../public/javascripts/data/user");
// const hashing = require("../public/javascripts/hashing");


// GET request
exports.log_in = function(req, res, next) {

  res.render('login');
};

// POST request
exports.checkLogin = function(req, res, next) {

  let username = req.body.username;
  let password = req.body.password;

  // If username and/or password was incorrect
  if(!logIn.tryLogin(username, password)) {

    res.render('login', { errorMessage: "Wrong username and/or password. Try again" })
  }

  // TODO:
  // 1. figure out how to use express-session
  // 2. assign some type of global object to this user?
  res.redirect('/');
};
