const Database = require('better-sqlite3');
const encryption = require('../encryption')

exports.signUp = (username) => {
    
    const db = new Database('controllers/stories.db');
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

    const db = new Database('controllers/stories.db');
    
    // Send password to be hashed
    var encryptedPassword = encryption.encryptPassword(password);

    const newUser = db.prepare('INSERT INTO users (user_name, encrypted_password) VALUES (?, ?)');
    const values = newUser.run(username, encryptedPassword);
    db.close();
    return;
};