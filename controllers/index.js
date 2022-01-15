const paragraph = require("../public/javascripts/data/paragraph");


exports.index = function(req, res, next) {
  
  res.render('index', { title: 'Express' });
};

// When a new paragraph is added
exports.handle_paragraph = function(req, res, next) {
  paragraph.insertParagraph;
  res.render('index', { ptext: paragraph.displayParagraph()});
};
