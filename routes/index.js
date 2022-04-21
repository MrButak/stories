var express = require('express');
var router = express.Router();

const users = require('../controllers/users');
const handleAuth = require('../public/javascripts/handleAuth');
const stories = require('../controllers/stories');


router.get('/', (req, res) => {
    if(!handleAuth.requireLogin(req, res)){
        res.redirect('/login');
    } 
    else {
        handleAuth.currentUser(req, res);
        stories.getAllStories(req, res);
    };
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

        res.render('login');
    }

        users.log_in(req, res)
    };

    

});

router.post('/login', (req, res) => {
    users.checkLogin(req, res)
});

// signup page
router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', (req, res) => {
    users.signUpUser(req, res)
});

// logout
router.get('/logout', (req, res) => {
    users.logout(req, res);
});

router.post('/logout', (req, res) => {
    users.logout(req, res);
});

//user profile
router.get('/user/:currentUserName', handleAuth.requireLogin, handleAuth.currentUser, users.userProfile);


module.exports = router;
