const Database = require('better-sqlite3');
const users = require("../public/javascripts/data/user");


// GET request /signup
exports.signUp = function(req, res, next) {

  res.render('signup');
}

// POST request /signup
exports.signUpUser = function(req, res, next) {

  let username = req.body.username;
  let password = req.body.password;

  // If username was already in database or an error occurred
  if(users.userNameAvailable(username)) {
    // TODO: send a "user name taken" message to views/signup
    res.render('signup');
  };

  // Username is available
  users.writeUserToDatabase(username, password);
  // TODO: send a "signup successfull" message to views/login
  res.redirect('login');
 
};

// GET request /login
exports.log_in = function(req, res, next) {

  res.render('login');
};

// POST request /login
exports.checkLogin = function(req, res, next) {

  let username = req.body.username;
  let password = req.body.password;

  // If login in successful
  if(users.tryLogin(username, password)) {

    // Write user information to req.sessions
    let db = new Database('public/javascripts/data/stories.db');
    let user = db.prepare('SELECT * FROM users WHERE user_name LIKE (?)').get(username);
    req.session.user = user
    
    res.redirect('/');
    
  }
  // login unsuccessful
  res.render('login'); //, { errorMessage: "Wrong username and/or password. Try again" })
 
};

// Function destroys user session and redirects to login page
// GET and POST request /logout
exports.logout = (req, res) => {

  req.session.destroy((error) => {
      if(error) throw error;
      res.redirect('/login')
  })
};
