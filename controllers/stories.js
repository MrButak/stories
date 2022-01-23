const storyManager = require('../public/javascripts/data/storyManager');
const paragraph = require('../public/javascripts/data/paragraph');

exports.getAllStories = function(req, res, next) {

    let currentUserName = req.session.user['user_name'];
    res.render('index', { stories: storyManager.displayAllStories(), currentUserName: currentUserName});
};

exports.addStory = function(req, res, next) {

    // Idea: send user to the 'add to story' page, so they can start the first paragraph of their new story.
    let storyTitle = req.body.addStoryInput;
    let userId = req.session.user['id'];
    
    storyManager.addStory(storyTitle, userId);
    res.redirect('/');
};

exports.viewStory = function(req, res, next) {
    
    let currentUserName = req.session.user['user_name'];
    
    // GET request
    if(req.method == "GET") {

       let storyId =  req.query['storyId'];
       res.render(`story`, { story: storyManager.getStory(storyId), currentUserName: currentUserName });
    }
    // POST request
    else {

        let storyId = req.body['storyId'];
        res.render('story', { story: storyManager.getStory(storyId), currentUserName: currentUserName });
    };
    
};

// POST request /addparagraph from form on /addparagraph
exports.addParagraph = function(req, res, next) {
    
    // Do a check here to see if there is a paragraph to submit
    // This /story POST is shared between the button on the home page to view a story and submitting a paragraph on /story
    // if(!req.body.paragraph_input) {
    //     next();
    // };
    
    let paragraphInput = req.body.paragraph_input;
    let userId = req.session.user['id'];
    let storyId = req.body['storyId'];
    
    paragraph.insertParagraph(paragraphInput, userId, storyId);
    next();
  };
  