const Database = require('better-sqlite3');
const encryption = require('../encryption')

exports.signUp = (username) => {
    
    const db = new Database('controllers/stories.db');
    const userStmt = db.prepare('SELECT user_name FROM users WHERE user_name = (?)');
    // compare username to database to see if available
    const userNameValue = userStmt.get(username);
    console.log(userNameValue)
    // if the chosen username is not already in the database
    if(userNameValue == undefined) {
        db.close();
        return true
    };
    db.close();
    return false;
};

exports.writeUserToDatabase = (username, password) => {
    const db = new Database('controllers/stories.db');
    
    // send password for encryption
    var encryptedPassword = encryption.encryptPassword(password);

    const newUser = db.prepare('INSERT INTO users (user_name, encrypted_password) VALUES (?, ?)');
    const values = newUser.run(username, encryptedPassword);
    db.close();
    return;
};