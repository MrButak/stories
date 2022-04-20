const { Pool, Client } = require('pg')
config = require('dotenv').config()

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        ssl: true,
        rejectUnauthorized: false
    }
});

client.connect();

// Function writes paragraph to the database
exports.insertParagraph = async (paragraph, userName, storiesId) => {

    let dbStmtOne = 'SELECT id from users WHERE user_name ILIKE ($1)';
    let dbValuesOne = [userName];
    let userId = await client.query(dbStmtOne, dbValuesOne);

    let dbStmtTwo = 'INSERT INTO paragraphs (content, user_id, stories_id) VALUES ($1, $2, $3)';
    let dbValuesTwo = [paragraph ,userId.rows[0].id, storiesId];
    await client.query(dbStmtTwo, dbValuesTwo);
    return;
};
