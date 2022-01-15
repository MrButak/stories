// this function should display paragraph from database to appropriate story on the DOM

exports.displayParagraph = () => {
    
    const Database = require('better-sqlite3');
    const db = new Database('controllers/stories.db');
    const new_paragraph = db.prepare('SELECT content FROM paragraphs WHERE id=1');
    
    let paragraph_div = document.getElementById("display_paragraph");
    let paragraph_text = document.createElement("p");
    paragraph_text.textContent = new_paragraph;
    paragraph_div.appendChild(paragraph_text);
    
    db.close();
    
};