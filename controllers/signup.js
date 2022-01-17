const signUp = require("../public/javascripts/data/signup");

exports.signUp = function(req, res, next) {
  res.render('signup');
}
exports.signUpUser = function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  // if sign up successful, store credentials in database, then send user to login
  if(signUp.signUp(username)) {
    signUp.writeUserToDatabase(username, password)
    res.redirect('login');
  }

  else {
    res.render('signup');
  }


};
