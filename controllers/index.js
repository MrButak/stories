const insertParagraph = require("../public/javascripts/insert-paragraph");
const displayParagraph = require("../public/javascripts/display-paragraph");

exports.index = function(req, res, next) {
    res.render('index', { title: 'Express' });
  };

exports.display_paragraph = function(req, res, next) {
  
  // displayParagraph.displayParagraph();
  res.render('index', { ptext: displayParagraph.displayParagraph()});
  
};

// exports.submit_paragraph = function(req, res, next) {
//   let paragraph = req.body.paragraph_input;
//   insertParagraph.insertParagraph(paragraph);
//   res.redirect('/');
// };
