

exports.testFunction = () => {
    const Database = require('better-sqlite3');
    const db = new Database('controllers/stories.db', {verbose: console.log});
    const stmt = db.prepare('INSERT INTO users (user_name, encrypted_password) VALUES ("Ralphy_Poon", "j0xxkdfjk33")');
    console.log(stmt);
    console.log("This funct! Now what?")
};

