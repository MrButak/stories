var express = require('express');
var router = express.Router();

let index = require('../controllers/index');
let logIn = require('../controllers/login');
let signUp = require('../controllers/signup');
let handleAuth = require('../public/javascripts/handleAuth')
let logout = require('../controllers/logout')

// home page
router.get('/', handleAuth.notAuth, handleAuth.currentUser, index.index);
router.post('/', handleAuth.currentUser, index.add_paragraph);

// login page
// if user is logged in I can use handleAuth. to restrict them from going here
router.get('/login', logIn.log_in);
router.post('/login', logIn.checkLogin)

// signup page
router.get('/signup', signUp.signUp);
router.post('/signup', signUp.signUpUser)

// logout
// router.get('/logout', logout.logout)
// router.post('/logout', logout.logout)


module.exports = router;
