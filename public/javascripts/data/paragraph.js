const Database = require('better-sqlite3');


// Function writes paragraph to the database
exports.insertParagraph = (paragraph) => {

    const db = new Database('public/javascripts/data/stories.db');
    // TODO:
    // 1. (user_id, stories_id) should contain current user and current story
    
    const new_paragraph = db.prepare('INSERT INTO paragraphs (user_id, stories_id, content) VALUES (?, ?, ?)');
    const values = new_paragraph.run(1, 1, paragraph);
    db.close();
    return;
};

// Function gets all paragraphs in the database, stores them in array
exports.displayAllParagraphs = () => {
    
    const db = new Database('public/javascripts/data/stories.db');
    // TODO:
    // 1. (stories_id) should contain the current story_id where the POST request was sent from
    
    const all_paragraphs = db.prepare('SELECT content FROM paragraphs WHERE stories_id=1');
    let all_p_obj = all_paragraphs.all();
    
    db.close();
    
    return(all_p_obj)
};
