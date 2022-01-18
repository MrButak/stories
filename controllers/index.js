const paragraph = require("../public/javascripts/data/paragraph");


// GET request
// displayAllParagraphs function returns an array of all paragraphs in database
exports.index = function(req, res, next) {

  // console.log("here (((((((((((((((--)))))))))))))))))")
  // console.log(req.session);
  res.render('index', { ps: paragraph.displayAllParagraphs() });
};

// POST request
exports.add_paragraph = function(req, res, next) {
  
  let paragraph_input = req.body.paragraph_input;
  paragraph.insertParagraph(paragraph_input);
  res.redirect('/')
};
