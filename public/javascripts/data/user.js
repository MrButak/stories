require('dotenv').config({ path: require('find-config')('.env') });
const hashing = require('../hashing');
const { Pool, Client } = require('pg');
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        // ssl: true,
        rejectUnauthorized: false
    }
});
client.connect();

// Function returns user inputted username from database. Will return undefined if available.
exports.userNameAvailable = async (username) => {
    
    let text = 'SELECT * FROM users WHERE user_name ILIKE ($1)';
    let values = [username];
    let userName = await client.query(text, values);
    if(userName.rows.length > 0) {
        return true;
    };
    return false;
};

// Function writes new user credentials to database
exports.writeUserToDatabase = async (username, password) => {

    let encryptedPassword = hashing.hashPassword(password);
    let text = 'INSERT INTO users (user_name, encrypted_password) VALUES ($1, $2)';
    let values = [username, encryptedPassword];
    await client.query(text, values);
    return;
};

// Function compares user inputted login credentials to database
exports.tryLogin = async (username, password) => {

    let text = 'SELECT * FROM users WHERE user_name ILIKE ($1)';
    let values = [username];
    let userInfo = await client.query(text, values);
    console.log(userInfo.rows[0])
    // console.log(password ,userInfo.rows[0].encryptedPassword);
    console.log('passwords to be compared ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
    if(userInfo.rows.length > 0 && userInfo.rows[0].user_name.toLowerCase() == username.toLowerCase() &&
    hashing.comparePassword(password, userInfo.rows[0].encrypted_password)) {
        
        return true;
    };
    return false;
};
