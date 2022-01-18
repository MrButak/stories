var express = require('express');
var router = express.Router();

let index = require('../controllers/index');
let loginOut = require('../controllers/login-out');
let signUp = require('../controllers/signup');
let handleAuth = require('../public/javascripts/handleAuth')


// home page
// restrict access to users not logged in
router.get('/', handleAuth.notAuth, handleAuth.currentUser, index.index);
router.post('/', handleAuth.currentUser, index.add_paragraph);

// login page
// restrict access to users already logged in
router.get('/login', handleAuth.isAuth, loginOut.log_in);
router.post('/login', loginOut.checkLogin)

// signup page
router.get('/signup', signUp.signUp);
router.post('/signup', signUp.signUpUser)

// logout
router.get('/logout', loginOut.logout);
router.post('/logout', loginOut.logout);


module.exports = router;
