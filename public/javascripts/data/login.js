exports.tryLogin = (username, password) => {

    const encryption = require('../encryption')
    const Database = require('better-sqlite3');
    const db = new Database('controllers/stories.db');

    // Check for valid user name
    const userStmt = db.prepare('SELECT user_name FROM users WHERE user_name = (?)');
    const userNameValue = userStmt.get(username);
    if(userNameValue == undefined) {
        console.log(`That user name is not in the database ${username}`)
        db.close();
        return false
    };
    
    // Get hashed password from database
    const passStmt = db.prepare('SELECT encrypted_password FROM users WHERE user_name = (?)');
    const passValue = passStmt.get(username);

    // Send hashed password to check against user entered password
    if(encryption.decryptPassword(password, passValue['encrypted_password'])) {
        // If login credentials match database entry log user in

        // TODO:
        // 1. save username to a global variable?
        // 2. express-session
        console.log(`successfull login username: ${username} | password: ${password}`);
        db.close();
        return true;
    };

    db.close();
    console.log(`That password is not in the database for user: ${username} password attempted: ${password}`);
    return false;

}