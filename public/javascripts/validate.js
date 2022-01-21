
exports.validateUserForm = (username, password) => {
    
    // Username is only allowed letters and number
    let reUsername = /^([A-Za-z0-9]){3,14}$/;

    // Password is only allow letters, numbers, and !@#$%^&*-_
    let rePassword = /^([A-Za-z0-9\!\@\#\$\%\^\&\*\-\_]){6,18}$/;
    
    return (reUsername.test(username) && rePassword.test(password))
}