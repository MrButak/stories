const logIn = require("../public/javascripts/data/login");
const encryption = require("../public/javascripts/encryption");

// GET request
exports.log_in = function(req, res, next) {
  res.render('login');
};

// POST request
exports.checkLogin = function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  if(logIn.tryLogin(username, password)) {
    // TODO:
    // 1. figure out how to use express-session
    // 2. assign some type of global object to this user with?
    res.redirect('/');
  }
  // if username and/or password was incorrect
  res.render('login', { errorMessage: "Wrong username and/or password. Try again" })

};
