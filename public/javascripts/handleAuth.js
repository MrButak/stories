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

exports.isAuth = (req, res, next) => {
    if(!req.session.isAuth) {
        next();
    };
    res.redirect('/');
};

exports.currentUser = (req, res, next) => {
    // change the order of this if statement if it actually works
    
    if(res.session.userName) {
        
        res.locals.userName = req.session.userName;
        next();
    }
    res.locals.userName = null;
    next();
};