const paragraph = require("../public/javascripts/data/paragraph");

// render the array of paragraphs here
exports.index = function(req, res, next) {
 
  res.render('index', { ps: paragraph.displayAllParagraphs() });
};

// When a new paragraph is added
exports.add_paragraph = function(req, res, next) {
  let paragraph_input = req.body.paragraph_input;
  paragraph.insertParagraph(paragraph_input);
  res.render('index', { ptext: paragraph.displayParagraph()});
};

// When a new paragraph is added
// exports.add_paragraph = function(req, res, next) {
//   let paragraph_input = req.body.paragraph_input;
//   paragraph.insertParagraph(paragraph_input);
//   res.render('index', { ptext: paragraph.displayParagraph()});
// };

