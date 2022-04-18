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

exports.displayAllStories = () => {

    // Get all stories (an array of objects)
    let text = 'SELECT * FROM stories ORDER BY id DESC';
    let allStories = await client.query(text);
    
    // Get the first five paragraphs (if that many) from each story.
    let i = allStories.length;
    allStories.rows.forEach( (story) => {
        let textStmt = 'SELECT * from paragraphs WHERE stories_id = (?) LIMIT 5';
        let paragraph = await client.query(textStmt);
        story['paragraphs'] = paragraph;
        i--;
    });
    console.log(allStories.rows)
    console.log('storyManager.js displayAllStories')


    // // Get all stories (an array of objects)
    // let db = new Database('public/javascripts/data/stories.db');
    // let allStories = db.prepare('SELECT * FROM stories ORDER BY id DESC').all();

    // // Get the first five paragraphs (if that many) from each story.
    // let i = allStories.length;
    // allStories.forEach( (story) => {
    //     let paraStmt = db.prepare('SELECT * from paragraphs WHERE stories_id = (?) LIMIT 5');
    //     story['paragraphs'] = paraStmt.all(i);
    //     i--;
    // });

    // db.close();
    return(allStories);
};

// Function writes a new story (title) to the database
exports.addStory = (storyTitle, userId) => {

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
exports.getStory = (storyId) => {

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
exports.allUserStories = (userName) => {

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
