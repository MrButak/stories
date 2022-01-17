exports.tryLogin = (username, password) => {

    const encryption = require('../encryption')
    const Database = require('better-sqlite3');
    const db = new Database('controllers/stories.db');

    // check for valid user name
    const userStmt = db.prepare('SELECT user_name FROM users WHERE user_name = (?)');
    // send username to be encrypted and check if is in database
    const userNameValue = userStmt.get(username);
    if(userNameValue == undefined) {
        console.log(`That user name is not in the database ${username}`)
        return false
    };
    
    // check for valid password

    const passStmt = db.prepare('SELECT encrypted_password FROM users WHERE user_name = (?)');
    
    const passValue = passStmt.get(username);
    // send password to decrypt here
    
    if(encryption.decryptPassword(password, passValue['encrypted_password'])) {
        // if login credentials match database entry log user in
        let currentUserName = userNameValue.user_name; // valid user name
        console.log(`successfull login username: ${username} | password: ${password}`);
        return true;
    };
    console.log(`That password is not in the database for user: ${username} password attempted: ${password}`);
    return false;

    
    
}