const insertParagraph = require("../public/javascripts/insert-paragraph");

exports.index = function(req, res, next) {
    res.render('index', { title: 'Express' });
  };

exports.submit_paragraph = function(req, res, next) {
  console.log("Form Input", req.body.paragraph_input);
  insertParagraph.insertParagraph();
  res.redirect('/');
};
