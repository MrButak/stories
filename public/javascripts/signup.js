exports.signUp = (username, password) => {
    const Database = require('better-sqlite3');
    const db = new Database('controllers/stories.db');

    const userStmt = db.prepare('SELECT user_name FROM users WHERE user_name = (?)');
    const userNameValue = userStmt.get(username);
    console.log(userNameValue)
    // if the chosen username is not already in the database
    if(userNameValue != undefined) {
        // TODO:
        // 1.  encrypt password
        // 2.  write username and password to database
        return true
    };
    return false;
};