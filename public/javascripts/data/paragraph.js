
exports.insertParagraph = (paragraph) => {
    const Database = require('better-sqlite3');
    const db = new Database('controllers/stories.db');
    const new_paragraph = db.prepare('INSERT INTO paragraphs (user_id, stories_id, content) VALUES (?, ?, ?)');
    const values = new_paragraph.run(4, 1, paragraph);
    db.close();
    return;
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
