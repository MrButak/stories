var express = require('express');
var router = express.Router();

let index = require('../controllers/index');
let logIn = require('../controllers/login');
let signUp = require('../controllers/signup')

/* GET home page. */
router.get('/', index.index);
/* POST home page. */
router.post('/', index.add_paragraph);

/* GET login page. */
router.get('/login', logIn.log_in);
// Post login page
router.post('/login', logIn.checkLogin)


// Get signup page
router.get('/signup', signUp.sign_up);
router.post('/signup', signUp.sign_up)





module.exports = router;
