exports.tryLogin = (username, password) => {

    const Database = require('better-sqlite3');
    const db = new Database('controllers/stories.db');

    // check for valid user name
    const userStmt = db.prepare('SELECT user_name FROM users WHERE user_name = (?)');
    const userNameValue = userStmt.get(username);
    if(userNameValue == undefined) {
        console.log(`That user name is not in the database ${username}`)
        return false
    };

    // check for valid password
    const passStmt = db.prepare('SELECT encrypted_password FROM users WHERE encrypted_password = (?)');
    const passValue = passStmt.get(password);
    if(passValue == undefined) {
        console.log(`That password is not in the database for user: ${username} password attempted: ${password}`);
        return false;
    };

    let currentUserName = userNameValue.user_name; // valid user name
    console.log(`successfull login username: ${username} | password: ${password}`);
    return true;
    
}