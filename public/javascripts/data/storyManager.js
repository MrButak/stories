const Database = require('better-sqlite3');

exports.displayAllStories = () => {
    
    // Get all stories (an array of objects)
    let db = new Database('public/javascripts/data/stories.db');
    let allStories = db.prepare('SELECT * FROM stories ORDER BY id DESC').all();

    // Get the first five paragraphs (if that many) from each story.
    let i = allStories.length;
    allStories.forEach( (story) => {
        let paraStmt = db.prepare('SELECT * from paragraphs WHERE stories_id = (?) LIMIT 5');
        story['paragraphs'] = paraStmt.all(i);
        i--;
    });

    db.close();
    return(allStories);
};

// Function writes a new story (title) to the database
exports.addStory = (storyTitle, userId) => {

    let db = new Database('public/javascripts/data/stories.db');
    let story = db.prepare('INSERT INTO stories (user_id, title) VALUES (?, ?)').run(userId, storyTitle);
    db.close();
    return;
};

// Function gets 1 story and all of it's paragraphs
exports.getStory = (storyId) => {
    
    let db = new Database('public/javascripts/data/stories.db');
    let story = db.prepare('SELECT * FROM stories WHERE id = (?)').get(storyId);
    // Add the paragraphs as a property
    story['paragraphs'] = db.prepare('SELECT content, id FROM paragraphs WHERE stories_id = (?)').all(storyId);
    
    db.close();
    return(story);
};
