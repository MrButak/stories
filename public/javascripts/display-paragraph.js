// this function should display paragraph from database to appropriate story on the DOM

exports.displayParagraph = () => {
    
    const Database = require('better-sqlite3');
    const db = new Database('controllers/stories.db');
    const current_paragraph = db.prepare('SELECT content FROM paragraphs WHERE id=1');
    let p_value = current_paragraph.get();
    db.close();
    return(p_value.content)
    
};