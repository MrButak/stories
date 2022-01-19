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
    
    // Check for valid user name
    let userStmt = db.prepare('SELECT user_name FROM users WHERE user_name = (?)');
    let userNameValue = userStmt.get(username);
    
    if(!userNameValue) {
        db.close();
        return false
    };
    
    // Get hashed password from database
    const passStmt = db.prepare('SELECT encrypted_password FROM users WHERE user_name = (?)');
    const passValue = passStmt.get(username);

    // Send hashed password to check against user entered password
    if(!hashing.comparePassword(password, passValue['encrypted_password'])) {

        db.close();
        return false;
    };

    db.close();
    return true;
};