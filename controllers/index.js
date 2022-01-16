const paragraph = require("../public/javascripts/data/paragraph");


exports.index = function(req, res, next) {
  paragraph.displayAllParagraphs();
  res.render('index', { title: 'Express' });
};

// When a new paragraph is added
exports.handle_paragraph = function(req, res, next) {
  let paragraph_input = req.body.paragraph_input;
  paragraph.insertParagraph(paragraph_input);
  res.render('index', { ptext: paragraph.displayParagraph()});
};

// temp will remove later
// exports.index = function(req, res, next) {
  
//   res.render('index', { title: 'Express' });
// };