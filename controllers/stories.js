const storyManager = require('../public/javascripts/data/storyManager');



exports.getAllStories = function(req, res, next) {
 
    let currentUserName = res.locals.userName;
    res.render('index', { stories: storyManager.displayAllStories()});
    
};

exports.goToStory = function(req, res, next) {
    let storyId = req.body['storyId'];
    
    next();
    // res.redirect('/');
};