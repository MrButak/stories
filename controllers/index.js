const handle_paragraph = require("../public/javascripts/data/paragraph");


exports.index = function(req, res, next) {
    res.render('index', { title: 'Express' });
  };

exports.display_paragraph = function(req, res, next) {
  
  // handle_paragraph.handle_paragraph();
  res.render('index', { ptext: handle_paragraph.displayParagraph()});
  
};

// exports.submit_paragraph = function(req, res, next) {
//   let paragraph = req.body.paragraph_input;
//   insertParagraph.insertParagraph(paragraph);
//   res.redirect('/');
// };
