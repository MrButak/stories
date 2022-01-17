const bcrypt = require('bcryptjs');

exports.encryptUsername = (username) => {
    
    return(bcrypt.hashSync(username, 10));

};

exports.encryptPassword = (password) => {
    // console.log("here?")
    return(bcrypt.hashSync(password, 10));
    
};

exports.decryptPassword = (password, passwordHash) => {

    // will return a boolean value
    return(bcrypt.compareSync(password, passwordHash));
}

