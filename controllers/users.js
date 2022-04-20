const { Pool, Client } = require('pg')
const dotenv = require("dotenv");
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
client.connect();

const users = require('../public/javascripts/data/user');
const validate = require('../public/javascripts/validate');
const storyManager = require("../public/javascripts/data/storyManager");

// GET request /signup
exports.signUp = function(req, res, next) {

  res.render('signup');
}

// POST request /signup
exports.signUpUser = function(req, res, next) {

  let username = req.body.username;
  let password = req.body.password;
  validate.validateUserForm(username, password)

  // If username was already in database or username/password format incorrect
  if(users.userNameAvailable(username) ||
  !validate.validateUserForm(username, password)) {
    
    res.render('signup');// TODO: send a "user name taken" message to views/signup. Or message about username and password format
  };

  // Username is available
  users.writeUserToDatabase(username, password);
  
  res.redirect('login'); // TODO: send a "signup successfull" message to views/login
 
};

// GET request /login
exports.log_in = function(req, res, next) {

    res.render('login');
};

// POST request /login
exports.checkLogin = async (req, res, next)  => {

    let username = req.body.username;
    let password = req.body.password;
    
    // If login successful
    if(users.tryLogin(username, password) &&
    validate.validateUserForm(username, password)) {

    // Write user information to req.sessions
        try {
            let text = 'SELECT * FROM users WHERE user_name ILIKE ($1)';
            let values = [username];
            let res = await client.query(text, values);
            req.session.user = res.rows[0].user_name;

            res.redirect('/');

        }
        catch(err) {
            console.log(err)
        };
    
    }
    // login unsuccessful
    res.redirect('login'); // TODO: send failed login error message to views/login
};

// Function destroys user session and redirects to login page
// GET and POST request /logout
exports.logout = (req, res) => {

  req.session.destroy((error) => {
      if(error) throw error;
      res.redirect('/login')
  })
};

exports.validate = (req, res) => {
  console.log("hey there");
};


// GET request TODO
exports.userProfile = (req, res) => {
    let currentUser = req.query['username'];
    res.render('user', { currentuser: currentUser, userstories: storyManager.allUserStories(currentUser) });
};
