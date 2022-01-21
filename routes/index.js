var express = require('express');
var router = express.Router();

const index = require('../controllers/index');
const users = require('../controllers/users');
const handleAuth = require('../public/javascripts/handleAuth');
const stories = require('../controllers/stories');

// home page
router.get('/', handleAuth.requireLogin, handleAuth.currentUser, stories.getAllStories);

// TODO: can I somehow combine both POST /story and /addparagraph  /addparagraph only has one extra function call. Mayber I can put a check in stories.addParagraph and use next().

// view story POST from form on /
router.post('/story', handleAuth.requireLogin, handleAuth.currentUser, stories.viewStory);
// router.get('/story', handleAuth.requireLogin, handleAuth.currentUser)

// add story POST from form on /
router.post('/addstory', handleAuth.requireLogin, handleAuth.currentUser, stories.addStory);

router.post('/addparagraph', handleAuth.requireLogin, handleAuth.currentUser, stories.addParagraph, stories.viewStory);

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
