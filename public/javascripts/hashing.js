const bcrypt = require('bcryptjs');

// Function hashes a user inputted password
exports.hashPassword = (password) => {

    return(bcrypt.hashSync(password, 10));   
};

// Function compares user inputted password to hashed password in database
exports.comparePassword = (password, passwordHash) => {
    // will return a boolean value
    
    return(bcrypt.compareSync(password, passwordHash));
};