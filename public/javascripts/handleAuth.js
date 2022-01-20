
// Function check session to see if user is logged in. If not redirect to login page
exports.requireLogin = (req, res, next) => {

    if(!req.session.user) {
        res.redirect('/login');
    };
    
    next();
};

// Function checks is user is logged in. If so redirects to home page (can use on any route e.g.: keep logged in user from login page)
exports.isLoggedIn = (req, res, next) => {

    if(!req.session.user) {
        next();
    };
    
    res.redirect('/');
};

exports.currentUser = (req, res, next) => {
    
    if(!req.session.user) {
        res.locals.userName = null;
        next();  
    };

    // Use this to pass information to the view layer
    res.locals.userName = req.session.user['user_name'];
    
    next();
};
