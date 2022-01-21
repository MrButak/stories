const Database = require('better-sqlite3');

// Function writes paragraph to the database
exports.insertParagraph = (paragraph, userId) => {

    let db = new Database('public/javascripts/data/stories.db');
    // TODO: stories_id should contain current story
  
    // Write paragraph to database
    let new_paragraph = db.prepare('INSERT INTO paragraphs (user_id, stories_id, content) VALUES (?, ?, ?)');
    new_paragraph.run(userId, 1, paragraph);
    db.close();
    return;
};

// Function gets all paragraphs in the database, stores them in an array of objects
exports.displayAllParagraphs = () => {
    
    let db = new Database('public/javascripts/data/stories.db');
    
    // TODO: stories_id should contain the current story_id where the POST request was sent from
    let all_paragraphs = db.prepare('SELECT content FROM paragraphs WHERE stories_id=1');
    let all_p_obj = all_paragraphs.all();
    
    db.close();
    return(all_p_obj)
};
