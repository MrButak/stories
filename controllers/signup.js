const signUp = require("../public/javascripts/signup");


exports.sign_up = function(req, res, next) {
  let user_name = req.body.username;
  let password = req.body.password;
  if(signUp.signUp(user_name, password)) {
    res.redirect('login', { errorMessage: "Successfully signed up. Please log in."});
  }
  else {
    res.render('signup');
  }


};
