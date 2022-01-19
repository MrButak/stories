
// Function check session to see if user is logged in. If not redirect to login page
exports.notAuth = (req, res, next) => {
    if(!req.session.isAuth) {
        res.redirect('/login');
    };
    
    next();
};

// Function checks is user is logged in. If so redirects to home page (can use on any route e.g.: keep logged in user from login page)
exports.isAuth = (req, res, next) => {
    if(!req.session.isAuth) {
        next();
    };
    
    res.redirect('/');
};

// As far as I can tell, res.locals can be passed to the view engine (pug).
// Also .locals is accessible only after this function?
// It also seems assigning res.locals to req.session. only make it available?
exports.currentUser = (req, res, next) => {
 
    if(!req.session.userName) {
        res.locals.userName = null;
        next();  
    };

    // As I know, res.locals can be passed to the view layer (.pug)
    res.locals.userName = req.session.userName;
    res.locals.userId = req.session.userId;

    next();
};
