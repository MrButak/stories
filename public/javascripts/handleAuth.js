// TODO:
// 1. understand exactly the relationship between req.session, res.session,
    // res.locals and the sessions.db
// 2. store from stories.db users(id) to the local session so I handle 
    // data/paragraph.js correctly



exports.notAuth = (req, res, next) => {
    if(!req.session.isAuth) {
        res.redirect('/login');
    };
    
    next();
};

// can use this to restrict logged in users from login page
exports.isAuth = (req, res, next) => {
    if(!req.session.isAuth) {
        next();
    };
    res.redirect('/');
};

// as far as I can tell, res.locals can be passed to the view engine (pug)
// also .locals is accessible only after this function 
// it also seems assigning res.locals to req.session. only make it available
exports.currentUser = (req, res, next) => {
 
    if(!req.session.userName) {
        res.locals.userName = null;
        next();
        
    };
    res.locals.userName = req.session.userName;
    next();
};
