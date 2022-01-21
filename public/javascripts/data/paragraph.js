const Database = require('better-sqlite3');

// Function writes paragraph to the database
exports.insertParagraph = (paragraph, userId, storiesId) => {

    let db = new Database('public/javascripts/data/stories.db');
    let new_paragraph = db.prepare('INSERT INTO paragraphs (user_id, stories_id, content) VALUES (?, ?, ?)');
    new_paragraph.run(userId, storiesId, paragraph);
    db.close();
    return;
};
