const Database = require('better-sqlite3');
const hashing = require('../hashing')


// Function checks if user inputted username is available
exports.signUp = (username) => {
    
    const db = new Database('public/javascripts/data/stories.db');
    const userStmt = db.prepare('SELECT user_name FROM users WHERE user_name = (?)');
    const userNameValue = userStmt.get(username);

    // Compare username to database to see if it's available
    if(userNameValue != undefined) {
        db.close();
        return false;
    };

    db.close();
    return true
    
};

// Function writes new user credentials to database
exports.writeUserToDatabase = (username, password) => {

    const db = new Database('public/javascripts/data/stories.db');
    // Send password to be hashed
    var encryptedPassword = hashing.hashPassword(password);

    const newUser = db.prepare('INSERT INTO users (user_name, encrypted_password) VALUES (?, ?)');
    const values = newUser.run(username, encryptedPassword);
    db.close();
    return;
};

// Function compares user inputted login credentials to database
exports.tryLogin = (username, password) => {

    const db = new Database('public/javascripts/data/stories.db');
    
    // Check for valid user name
    const userStmt = db.prepare('SELECT user_name FROM users WHERE user_name = (?)');
    const userNameValue = userStmt.get(username);
    
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