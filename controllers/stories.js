const storyManager = require('../public/javascripts/data/storyManager');
const paragraph = require('../public/javascripts/data/paragraph');

exports.getAllStories = async (req, res, next) => {
    
    let currentUserName = req.session.user;
    let allStories = await storyManager.displayAllStories();
    // let allStories = {
    //     title: 'The Title Of the Story'
    // }
    allStories = JSON.parse((JSON.stringify(allStories)));
    console.log(allStories)
    console.log('allStories ^^^^^^ sent to frontend')
    res.render('index', { stories: allStories, currentUserName: 'bob'});
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
    
    let paragraphInput = req.body.paragraph_input;
    let userId = req.session.user['id'];
    let storyId = req.body['storyId'];
    
    paragraph.insertParagraph(paragraphInput, userId, storyId);
    next();
  };
  