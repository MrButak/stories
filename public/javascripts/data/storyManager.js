const Database = require('better-sqlite3');


exports.displayAllStories = () => {
    
    // Get all stories (an array of objects)
    let db = new Database('public/javascripts/data/stories.db');
    let allStories = db.prepare('SELECT * FROM stories').all();

    // Get the first five paragraphs (if that many) from each story.
    // I add a 'paragraphs' property (an array) to the story objects.
    // I then push all paragraphs from that story into the array.
    for(let i = 1; i < allStories.length + 1; i++) {
        let paraArry = [];
        let paraStmt = db.prepare('SELECT * from paragraphs WHERE stories_id = (?) LIMIT 5');
        paraArry.push(paraStmt.all(i));
        allStories[i - 1]['paragraphs'] = []
        for(let j = 0; j < paraArry[0].length; j++) {
            allStories[i - 1]['paragraphs'].push([paraArry[0][j]['content']]);
        }   
    };
   
    db.close();
    return(allStories);
};

exports.addStory = (storyTitle, userId) => {

    let db = new Database('public/javascripts/data/stories.db');
    const new_user = db.prepare('INSERT INTO stories (user_id, title) VALUES (?, ?)').run(userId, storyTitle);
    return;
};
