const insertParagraph = require("../public/javascripts/insert-paragraph");

exports.index = function(req, res, next) {
    res.render('index', { title: 'Express' });
  };

exports.submit_paragraph = function(req, res, next) {
  let paragraph = req.body.paragraph_input;
  insertParagraph.insertParagraph(paragraph);
  res.redirect('/');
};
