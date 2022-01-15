var express = require('express');
var router = express.Router();

let index = require('../controllers/index')
/* GET home page. */
router.get('/', index.index);
/* POST home page. */
router.post('/', index.display_paragraph);
// router.post('/', index.submit_paragraph);

module.exports = router;
