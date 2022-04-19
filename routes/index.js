var express = require('express');
var router = express.Router();

const users = require('../controllers/users');
const handleAuth = require('../public/javascripts/handleAuth');
const stories = require('../controllers/stories');
const res = require('express/lib/response');


// home page
// router.get('/', handleAuth.requireLogin, handleAuth.currentUser, stories.getAllStories);

router.get('/', (req, res) => {
    // res.redirect('/login');

    if(!handleAuth.requireLogin){
        console.log('its false')
        res.redirect('/login');
        return;
    } 
    else {
        handleAuth.currentUser(req, res)
        stories.getAllStories(req, res);
    }    
});


// view story POST from form on '/ homepage' and submit paragraph on '/story'
router.post('/story', handleAuth.requireLogin, handleAuth.currentUser, stories.addParagraph, stories.viewStory);
router.get('/story/:id', handleAuth.requireLogin, handleAuth.currentUser, stories.viewStory);

// add story POST from form on '/ homepage'. Redirects back to '/ homepage'
router.post('/addstory', handleAuth.requireLogin, handleAuth.currentUser, stories.addStory);

// login page
router.get('/login', (req, res) => {

    if(!handleAuth.isLoggedIn(req, res)) {
        console.log("shoud be false here!!")
        users.log_in(req, res)
    }
    

}); 
router.post('/login', users.checkLogin);

// signup page
router.get('/signup', users.signUp);
router.post('/signup', users.signUpUser);

// logout
router.get('/logout', users.logout);
router.post('/logout', users.logout);

//user profile
router.get('/user/:currentUserName', handleAuth.requireLogin, handleAuth.currentUser, users.userProfile);


module.exports = router;
