// Function check session to see if user is logged in. If not redirect to login page
exports.requireLogin = (req, res, next) => {
    if(!req.session.user) {
        
        return false
        // res.redirect('/login');
    };
    return true
    // next();
};

// Function checks is user is logged in. If so redirects to home page (can use on any route e.g.: keep logged in user from login page)
exports.isLoggedIn = (req, res, next) => {
    console.log(req.session);
    console.log('Should have session information....')
    if(!req.session.user) {
        return false;
    };
    
    res.redirect('/');
};

exports.currentUser = (req, res, next) => {
   
    if(!req.session.user) {
        res.locals.userName = null;
        return;  
    };
    
    // Use this to pass information to the view layer
    res.locals.userName = req.session.user['user_name'];
    
    
    return;
};
