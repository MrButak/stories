const Database = require('better-sqlite3');
const hashing = require('../hashing')


// Function returns user inputted username from database. Will return undefined if available.
exports.userNameAvailable = (username) => {
    
    let db = new Database('public/javascripts/data/stories.db');
    let userStmt = db.prepare('SELECT user_name FROM users WHERE user_name LIKE (?)');
    let userName = userStmt.get(username);

    db.close();
    return userName;
};

// Function writes new user credentials to database
exports.writeUserToDatabase = (username, password) => {

    let db = new Database('public/javascripts/data/stories.db');
    // Send password to be hashed
    let encryptedPassword = hashing.hashPassword(password);

    let newUser = db.prepare('INSERT INTO users (user_name, encrypted_password) VALUES (?, ?)');
    newUser.run(username, encryptedPassword);
    db.close();
    return;
};

// Function compares user inputted login credentials to database
exports.tryLogin = (username, password) => {

    let db = new Database('public/javascripts/data/stories.db');
    
    // Get users credentials
    let user = db.prepare('SELECT user_name, encrypted_password FROM users WHERE user_name LIKE (?)').get(username);
    db.close();

    // Must do this check, because express-js will exit with error if trying to access user['user_name'] if user is undefined
    if(!user) {

        return false;
    };
    
    return (user['user_name'] && 
    hashing.comparePassword(password, user['encrypted_password']));
     
};