const signUp = require("../public/javascripts/data/user");


// GET request
exports.signUp = function(req, res, next) {

  res.render('signup');
}

// POST request
exports.signUpUser = function(req, res, next) {

  let username = req.body.username;
  let password = req.body.password;

  // If username was already in database or an error occurred
  if(!signUp.signUp(username)) {

    res.render('signup');
  };

  signUp.writeUserToDatabase(username, password)
  res.redirect('login');
 
};
