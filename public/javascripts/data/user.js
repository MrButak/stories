const hashing = require('../hashing');
const { Pool, Client } = require('pg')
const dotenv = require("dotenv");
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
client.connect();

// Function returns user inputted username from database. Will return undefined if available.
exports.userNameAvailable = async (username) => {
    
    let text = 'SELECT user_name FROM users WHERE user_name ILIKE ($1)';
    let values = [username];
    let res = await client.query(text, values);
    return res.rows[0];
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

    let text = 'SELECT user_name, encrypted_password FROM users WHERE user_name LIKE ($1)';
    let values = [username];
    let res = await client.query(text, values);
    let user = res.rows[0]
    console.log(res.rows);
    console.log('users.js tryLogin')

    return (user && 
    hashing.comparePassword(password, user.encrypted_password));
     
};