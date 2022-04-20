var express = require('express');
var router = express.Router();

const users = require('../controllers/users');
const handleAuth = require('../public/javascripts/handleAuth');
const stories = require('../controllers/stories');
const res = require('express/lib/response');



router.get('/', (req, res) => {

    if(!handleAuth.requireLogin){
        console.log('its false')
        res.redirect('/login');
        return;
    } 
    else {
        handleAuth.currentUser(req, res);
        stories.getAllStories(req, res);
        
    }    
});


// to add paragraph to story
router.post('/story', (req, res) => {
    
    if(handleAuth.requireLogin(req, res)) {

        handleAuth.currentUser(req, res);
        stories.addParagraph(req, res);
    }
    else {
        res.redirect('/login');
    };
    
});

router.get('/story/:id', (req, res) => {

    if(handleAuth.requireLogin(req, res)) {
        handleAuth.currentUser(req, res); 
        stories.viewStory(req, res);
    }
    else {
        res.redirect('/login');
    };
    
});

// add story POST from form on '/ homepage'. Redirects back to '/ homepage'
router.post('/addstory', (req, res) => {

    if(handleAuth.requireLogin(req, res)) {

        handleAuth.currentUser(req, res);
        stories.addStory(req, res);
    }
    else {

        res.redirect('/login');
        
    };
    
});

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
