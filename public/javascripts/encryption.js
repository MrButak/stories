const bcrypt = require('bcryptjs');

// Function hashes a user imputed password
exports.encryptPassword = (password) => {

    return(bcrypt.hashSync(password, 10));   
};

// Function compares user imputed password to hashed password in database
exports.decryptPassword = (password, passwordHash) => {

    // will return a boolean value
    return(bcrypt.compareSync(password, passwordHash));
}

