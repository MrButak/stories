const paragraph = require("../public/javascripts/data/paragraph");


// GET request / displayallparagraphs
// displayAllParagraphs function returns an array of all paragraphs in database
exports.index = function(req, res, next) {
 
  let currentUserName = res.locals.userName;
  res.render('index', { paragraphs: paragraph.displayAllParagraphs(), currentUserName: currentUserName });
};

// POST request / addparagraph
exports.add_paragraph = function(req, res, next) {
  
  let userId = req.session.user['id'];
  let paragraph_input = req.body.paragraph_input;

  paragraph.insertParagraph(paragraph_input, userId);
  res.redirect('/')
};
