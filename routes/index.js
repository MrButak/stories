var express = require('express');
var router = express.Router();

const users = require('../controllers/users');
const handleAuth = require('../public/javascripts/handleAuth');
const stories = require('../controllers/stories');


// home page
router.get('/', handleAuth.requireLogin, handleAuth.currentUser, stories.getAllStories);

// view story POST from form on '/ homepage' and submit paragraph on '/story'
router.post('/story', handleAuth.requireLogin, handleAuth.currentUser, stories.addParagraph, stories.viewStory);
router.get('/story/:id', handleAuth.requireLogin, handleAuth.currentUser, stories.viewStory);

// add story POST from form on '/ homepage'. Redirects back to '/ homepage'
router.post('/addstory', handleAuth.requireLogin, handleAuth.currentUser, stories.addStory);

// login page
router.get('/login', handleAuth.isLoggedIn, users.log_in);
router.post('/login', users.checkLogin);

// signup page
router.get('/signup', users.signUp);
router.post('/signup', users.signUpUser);

// logout
router.get('/logout', users.logout);
router.post('/logout', users.logout);

module.exports = router;
