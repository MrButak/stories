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

exports.displayAllStories = async () => {

    
    // create an arry of objects. each obj holds the story title and up to 5 paragraphs
    let storyArry = [];
    let storyObj = {};
    let text = 'SELECT * FROM stories ORDER BY id DESC';
    let allStories = await client.query(text);
    
    
    // Get the first five paragraphs (if that many) with each story.
    for(let i = 0; i < allStories.rows.length; i++) {
        storyObj = {};
        let textStmt = 'SELECT * from paragraphs WHERE stories_id = ($1) LIMIT 5';
        let values = [allStories.rows[i].id];
        let paragraph = await client.query(textStmt, values);
        storyObj['title'] = allStories.rows[i];
        storyObj['paragraphs'] = paragraph.rows;
        storyArry.push(storyObj)
    };
    
    return(storyArry);
};

// Function writes a new story (title) to the database
exports.addStory = async (storyTitle, userName) => {

    // get user id
    let dbStmtOne = 'SELECT id FROM users WHERE user_name ILIKE ($1)';
    let dbValuesOne = [userName];
    let userId = await client.query(dbStmtOne, dbValuesOne);

    // insert new story title into db
    let text = 'INSERT INTO stories (user_id, title) VALUES ($1, $2)';
    let values = [userId.rows[0].id, storyTitle];
    await client.query(text, values);
    
    return;
};

// Function gets 1 story and all of it's paragraphs
exports.getStory = async (storyId) => {

    // gets 1 story and all paragraphs associated with it
    let storyObj = {
        'title': null,
        'paragraphs': []
    };
    let text = 'SELECT * FROM stories WHERE id = ($1)';
    let values = [storyId];
    let res = await client.query(text, values);

// TODO
// 1. if no paragraphs for a story
    storyObj['title'] = res.rows[0];
    let stmtTwo = 'SELECT * FROM paragraphs WHERE stories_id = ($1) ORDER BY id ASC';
    let dbValuesTwo = [storyId];
    let paragraphs = await client.query(stmtTwo, dbValuesTwo);

    for(let i = 0; i < paragraphs.rows.length; i++) {

        storyObj['paragraphs'].push(paragraphs.rows[i]);
    };
    
    return(storyObj);
};

// function gets all stories from specified user
exports.allUserStories = async (userName) => {

    let text = 'SELECT * FROM stories INNER JOIN users ON stories.user_id = users.id WHERE users.user_name LIKE ($1)';
    let values = [userName];
    let res = await client.query(text, values);
    
    return(res.rows);
};
