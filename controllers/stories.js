const storyManager = require('../public/javascripts/data/storyManager');



exports.getAllStories = function(req, res, next) {

    let currentUserName = res.locals.userName;
    res.render('index', { stories: storyManager.displayAllStories(), currentUserName: currentUserName});
    
};

exports.addStory = function(req, res, next) {
    // possibly send user to the add to story page, so they can start the first paragraph of their new story

    let storyTitle = req.body.addStoryInput;
    let userId = req.session.user['id'];
    
    storyManager.addStory(storyTitle, userId);
    res.redirect('/');
};

exports.goToStory = function(req, res, next) {
    let storyId = req.body['storyId'];
    
    next();
    // res.redirect('/');
};