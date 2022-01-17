var express = require('express');
var router = express.Router();

let index = require('../controllers/index');
let logIn = require('../controllers/login');
let signUp = require('../controllers/signup')

// home page
router.get('/', index.index);
router.post('/', index.add_paragraph);

// login page
router.get('/login', logIn.log_in);
router.post('/login', logIn.checkLogin)

// signup page
router.get('/signup', signUp.signUp);
router.post('/signup', signUp.signUpUser)


module.exports = router;
