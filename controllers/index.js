const paragraph = require("../public/javascripts/data/paragraph");


// GET request
// displayAllParagraphs function returns an array of all paragraphs in database
exports.index = function(req, res, next) {
  // console.log("here ************** res.locals get index. because handleAuth.current user was called beforehand")
  // console.log(res.locals.userName)
  let currentUser = res.locals.userName;
  res.render('index', { ps: paragraph.displayAllParagraphs(), currentUser: currentUser })
  // , { currentUser: user});
};

// POST request
exports.add_paragraph = function(req, res, next) {
  
  
  let paragraph_input = req.body.paragraph_input;
  paragraph.insertParagraph(paragraph_input, req, res);
  res.redirect('/')
};
