var express = require('express');
var router = express.Router();

const index = require('../controllers/index');
const users = require('../controllers/users');
const handleAuth = require('../public/javascripts/handleAuth');
const stories = require('../controllers/stories');

// home page
// restrict access to users not logged in
// router.get('/', handleAuth.requireLogin, handleAuth.currentUser, index.index);
// router.post('/', handleAuth.currentUser, index.add_paragraph);
router.get('/', handleAuth.currentUser, stories.getAllStories);
router.post('/', stories.goToStory);

// login page
// restrict access to users already logged in
router.get('/login', handleAuth.isLoggedIn, users.log_in);
router.post('/login', users.checkLogin)

// signup page
router.get('/signup', users.signUp);
router.post('/signup', users.signUpUser) // where is this??

// logout
router.get('/logout', users.logout);
router.post('/logout', users.logout);

module.exports = router;
