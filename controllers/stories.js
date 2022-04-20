const storyManager = require('../public/javascripts/data/storyManager');
const paragraph = require('../public/javascripts/data/paragraph');
const { json } = require('express/lib/response');

exports.getAllStories = async (req, res, next) => {
    
    let currentUserName = req.session.user;
    let allStories = await storyManager.displayAllStories();
    allStories = JSON.parse((JSON.stringify(allStories)));
    res.render('index', { stories: allStories, currentUserName: currentUserName});
};

exports.addStory = function(req, res, next) {
    
    // Idea: send user to the 'add to story' page, so they can start the first paragraph of their new story.
    let storyTitle = req.body.addStoryInput;
    let userName = req.session.user;
    
    storyManager.addStory(storyTitle, userName);
    res.redirect('/');
};

exports.viewStory = async (req, res, next) => {
    
    let currentUserName = req.session.user['user_name'];
    let storyId;
    // GET request
    if(req.method == "GET") {
        
        storyId =  req.query['storyId'];
    }
    // POST request
    else {
        
        storyId = req.body['storyId'];
    };

    let storyObjOne = await storyManager.getStory(storyId);
    storyObjOne = JSON.parse(JSON.stringify(storyObjOne));
    
    res.render(`story`, { story: storyObjOne, currentUserName: currentUserName });
    
};

// POST request /addparagraph from form on /addparagraph
exports.addParagraph = async (req, res, next) => {
    
    let paragraphInput = req.body.paragraph_input;
    let userName = req.session.user;
    let storyId = req.body['storyId'];
    
    await paragraph.insertParagraph(paragraphInput, userName, storyId);
    let fullStory = await storyManager.getStory(storyId);
    fullStory = JSON.parse(JSON.stringify(fullStory));
    res.render('story', { story: fullStory, currentUserName: userName });
    return;
  };
  