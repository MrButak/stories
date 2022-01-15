var express = require('express');
var router = express.Router();

let index = require('../controllers/index');

/* GET home page. */
router.get('/', index.index);
/* POST home page. */
router.post('/', index.handle_paragraph);


module.exports = router;
