const logIn = require("../public/javascripts/login");


exports.log_in = function(req, res, next) {
 
  res.render('login');
};

exports.checkLogin = function(req, res, next) {
  let user_name = req.body.username;
  let password = req.body.password;
  // if login credentials are correct
  if(logIn.tryLogin(user_name, password)) {
    // TODO:
    // 1. figure out how to use express-session
    res.redirect('/');
  }
  // if username and/or password was incorrect
  res.render('login', { errorMessage: "Wrong username and/or password. Try again" })

};
