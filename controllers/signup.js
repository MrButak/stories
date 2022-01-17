const signUp = require("../public/javascripts/data/signup");


// GET request
exports.signUp = function(req, res, next) {
  res.render('signup');
}

// POST request
exports.signUpUser = function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  if(signUp.signUp(username)) {
    signUp.writeUserToDatabase(username, password)
    res.redirect('login');
  }

  // If username was already in database or an error occurred
  else {
    res.render('signup');
  }
};
