const Database = require('better-sqlite3');


const { Pool, Client } = require('pg')
config = require('dotenv').config()

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

// Function writes paragraph to the database
exports.insertParagraph = (paragraph, userId, storiesId) => {


    const text = 'INSERT INTO paragraphs (user_id, stories_id, content) VALUES ($1, $2, $3)'
    let values = [userId, storiesId, paragraph];
    const res = await client.query(text, values);

    // let db = new Database('public/javascripts/data/stories.db');
    // let new_paragraph = db.prepare('INSERT INTO paragraphs (user_id, stories_id, content) VALUES (?, ?, ?)');
    // new_paragraph.run(userId, storiesId, paragraph);
    // db.close();
    return;
};
