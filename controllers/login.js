const logIn = require("../public/javascripts/login");


exports.log_in = function(req, res, next) {
 
  res.render('login');
};

exports.checkLogin = function(req, res, next) {
  let user_name = req.body.username;
  let password = req.body.password;
  // if login credentials are correct
  if(logIn.tryLogin(user_name, password)) {
    res.redirect('/');
  }
  res.redirect('/login')

};
