const storyManager = require('../public/javascripts/data/storyManager');
const paragraph = require('../public/javascripts/data/paragraph');


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

exports.viewStory = function(req, res, next) {

    let currentUserName = res.locals.userName;
    let storyId = req.body['storyId'];

    res.render('story', { story: storyManager.getStory(storyId), currentUserName: currentUserName });
};

// TODO: understand more about routing and how I can possibly share /story with two post requests
// POST request /addparagraph from form on /addparagraph
exports.addParagraph = function(req, res, next) {
    
    let userId = req.session.user['id'];
    let storyId = req.body['storyId'];
    let paragraphInput = req.body.paragraph_input;
    
    paragraph.insertParagraph(paragraphInput, userId, storyId);
    next();
  };