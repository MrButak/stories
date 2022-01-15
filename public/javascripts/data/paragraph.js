// I need to do some double checks to make sure input is NOT NULL

exports.insertParagraph = (paragraph) => {
    const Database = require('better-sqlite3');
    const db = new Database('controllers/stories.db');
    const new_paragraph = db.prepare('INSERT INTO paragraphs (content) VALUES (?)');
    const values = new_paragraph.run(paragraph)
    db.close();
    
};

// this function should display paragraph from database to appropriate story on the DOM

exports.displayParagraph = () => {
    
    const Database = require('better-sqlite3');
    const db = new Database('controllers/stories.db');

    // I need to get all values where story id is the same
    // const current_paragraph = db.prepare('SELECT content FROM paragraphs WHERE id=1');
    let p_value = current_paragraph.get();
    db.close();
    return(p_value.content)
    
};

