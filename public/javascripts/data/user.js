const Database = require('better-sqlite3');
const hashing = require('../hashing')

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
client.connect();

// Function returns user inputted username from database. Will return undefined if available.
exports.userNameAvailable = (username) => {
    
    let text = 'SELECT user_name FROM users WHERE user_name LIKE ($1)';
    let values = [username];
    let res = await client.query(text, values);
    console.log(res.rows);
    console.log('users.js userNameAvailable')
    // let db = new Database('public/javascripts/data/stories.db');
    // let userStmt = db.prepare('SELECT user_name FROM users WHERE user_name LIKE (?)');
    // let userName = userStmt.get(username);
    // db.close();
    return res.rows;
};

// Function writes new user credentials to database
exports.writeUserToDatabase = (username, password) => {

    let encryptedPassword = hashing.hashPassword(password);
    let text = 'INSERT INTO users (user_name, encrypted_password) VALUES ($1, $2)';
    let values = [username, encryptedPassword];
    let res = await client.query(text, values);
    console.log(res.rows);
    console.log('users.js writeUserToDatabase')

    // let db = new Database('public/javascripts/data/stories.db');
    // Send password to be hashed
    // let encryptedPassword = hashing.hashPassword(password);

    // let newUser = db.prepare('INSERT INTO users (user_name, encrypted_password) VALUES (?, ?)');
    // newUser.run(username, encryptedPassword);
    // db.close();
    return;
};

// Function compares user inputted login credentials to database
exports.tryLogin = (username, password) => {

    let user;
    let text = 'SELECT user_name, encrypted_password FROM users WHERE user_name LIKE ($1)';
    let values = [username];
    let res = await client.query(text, values);
    user = res.rows
    console.log(res.rows);
    console.log('users.js tryLogin')

    // let db = new Database('public/javascripts/data/stories.db');
    
    // // Get users credentials
    // let user = db.prepare('SELECT user_name, encrypted_password FROM users WHERE user_name LIKE (?)').get(username);
    // db.close();
    return (user && 
    hashing.comparePassword(password, user['encrypted_password']));
     
};