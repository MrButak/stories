const Database = require('better-sqlite3');
const hashing = require('../hashing')



exports.signUp = (username) => {
    
    const db = new Database('public/javascripts/data/stories.db');
    const userStmt = db.prepare('SELECT user_name FROM users WHERE user_name = (?)');
    const userNameValue = userStmt.get(username);

    // Compare username to database to see if it's available
    if(userNameValue == undefined) {
        db.close();
        return true
    };

    db.close();
    return false;
};


exports.writeUserToDatabase = (username, password) => {

    const db = new Database('public/javascripts/data/stories.db');
    // Send password to be hashed
    var encryptedPassword = hashing.hashPassword(password);

    const newUser = db.prepare('INSERT INTO users (user_name, encrypted_password) VALUES (?, ?)');
    const values = newUser.run(username, encryptedPassword);
    db.close();
    return;
};


exports.tryLogin = (username, password) => {

    const db = new Database('public/javascripts/data/stories.db');
    // Check for valid user name
    const userStmt = db.prepare('SELECT user_name FROM users WHERE user_name = (?)');
    const userNameValue = userStmt.get(username);
    if(!userNameValue) {
        console.log(`That user name is not in the database ${username}`)
        db.close();
        return false
    };
    
    // Get hashed password from database
    const passStmt = db.prepare('SELECT encrypted_password FROM users WHERE user_name = (?)');
    const passValue = passStmt.get(username);

    // Send hashed password to check against user entered password
    if(!hashing.comparePassword(password, passValue['encrypted_password'])) {

        db.close();
        console.log(`That password is not in the database for user: ${username} password attempted: ${password}`);
        return false;
    };

    // If login credentials match database entry log user in

    // TODO:
    // 1. save username to a global variable?
    // 2. express-session
    console.log(`successfull login username: ${username} | password: ${password}`);
    db.close();
    return true;

    

}