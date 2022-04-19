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

exports.displayAllStories = async () => {

    
    let storyArry = [];
    let storyObj = {};
    let text = 'SELECT * FROM stories ORDER BY id DESC';
    let allStories = await client.query(text);
    
    
    // Get the first five paragraphs (if that many) from each story.
    
    for(let i = 0; i < allStories.rows.length; i++) {
        let textStmt = 'SELECT * from paragraphs WHERE stories_id = ($1) LIMIT 5';
        let values = [allStories.rows[i].id];
        let paragraph = await client.query(textStmt, values);
        
        
        storyObj['title'] = allStories.rows[i];
        storyObj['paragraphs'] = paragraph.rows[0];
        storyArry.push(storyObj)
    };
    // console.log('storyManager.js displayAllStories ^^^^^^')
    // console.log(storyArry)
    // console.log('storyManager.js displayAllStories ^^^^^^')


   
    return(storyArry);
};

// Function writes a new story (title) to the database
exports.addStory = async (storyTitle, userId) => {

    let text = 'INSERT INTO stories (user_id, title) VALUES ($1, $2)';
    let values = [userId, storyTitle];
    let res = await client.query(text, values);
    console.log(res.rows);
    console.log('storyManager.js addStory');
    // let db = new Database('public/javascripts/data/stories.db');
    // let story = db.prepare('INSERT INTO stories (user_id, title) VALUES (?, ?)').run(userId, storyTitle);
    // db.close();
    return;
};

// Function gets 1 story and all of it's paragraphs
exports.getStory = async (storyId) => {

    let story = {};
    let text = 'SELECT * FROM stories WHERE id = ($1)';
    let values = [storyId];
    let res = await client.query(text, values);
    story['paragraphs'] = res.rows
    console.log(res.rows);
    console.log('storyManager.js getStory');
    // Add the paragraphs as a property
    // let db = new Database('public/javascripts/data/stories.db');
    // let story = db.prepare('SELECT * FROM stories WHERE id = (?)').get(storyId);
    // db.close();
    
    
    return(story);
};

// function gets all stories from specified user
exports.allUserStories = async (userName) => {

    let text = 'SELECT * FROM stories INNER JOIN users ON stories.user_id = users.id WHERE users.user_name LIKE ($1)';
    let values = [userName];
    let res = await client.query(text, values);
    console.log(res.rows);
    console.log('storyManager.js allUserStories');

    // let db = new Database('public/javascripts/data/stories.db');
    // let userStories = db.prepare('SELECT * FROM stories INNER JOIN users ON stories.user_id = users.id WHERE users.user_name LIKE (?)').all(userName);
    // db.close();
    return(res.rows);
};
