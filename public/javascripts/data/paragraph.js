// I need to do some double checks to make sure input is NOT NULL

exports.insertParagraph = (paragraph) => {
    const Database = require('better-sqlite3');
    const db = new Database('controllers/stories.db');
    const new_paragraph = db.prepare('INSERT INTO paragraphs (content) VALUES (?)');
    const values = new_paragraph.run(paragraph);
    db.close();
    return;
};

// this function should display paragraph from database to appropriate story on the DOM

exports.displayParagraph = () => {
    
    const Database = require('better-sqlite3');
    const db = new Database('controllers/stories.db');
    const current_paragraph = db.prepare('SELECT content FROM paragraphs WHERE story_id=1');
    let p_value = current_paragraph.get();

    db.close();
    return(p_value.content)
    
};

exports.displayAllParagraphs = () => {
    
    const Database = require('better-sqlite3');
    const db = new Database('controllers/stories.db');

    const all_paragraphs = db.prepare('SELECT content FROM paragraphs WHERE stories_id=1');
    let all_p_obj = all_paragraphs.all();
    let all_p_arry = [];
    for(let i = 0; i < all_p_obj.length; i++) {
        all_p_arry.push(all_p_obj[i].content);
    };
    db.close();
    return(all_p_arry)
    
    
};
