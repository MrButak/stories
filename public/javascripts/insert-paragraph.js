

exports.insertParagraph = () => {
    const Database = require('better-sqlite3');
    const db = new Database('controllers/stories.db');
    
    const new_paragraph = db.prepare('INSERT INTO paragraphs (content) VALUES (?)');
    //const values = new_user.run("rittaP00n", "9kds204s")
    console.log(stmt[0].user_name);

    db.close();
    
};

