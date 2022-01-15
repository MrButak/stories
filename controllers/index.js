exports.index = function(req, res, next) {
    res.render('index', { title: 'Express' });
  };

// exports.submit_paragraph = function(req, res, next) {
//   console.log(req.body.paragraph_input);
//   res.redirect('/')
// };