

exports.insertParagraph = (paragraph) => {
    const Database = require('better-sqlite3');
    const db = new Database('controllers/stories.db');
    
    const new_paragraph = db.prepare('INSERT INTO paragraphs (content) VALUES (?)');
    const values = new_paragraph.run(paragraph)

    db.close();
    
};

