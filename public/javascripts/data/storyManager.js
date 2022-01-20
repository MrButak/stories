const Database = require('better-sqlite3');

exports.displayAllStories = () => {
    
    // Get all stories
    let db = new Database('public/javascripts/data/stories.db');
    let allStories = db.prepare('SELECT * FROM stories').all();


    // Get the first five paragraphs from each story
    let paraArry = [];
    for(let i = 1; i < allStories.length + 1; i++) {
        let paraStmt = db.prepare('SELECT * from paragraphs WHERE stories_id = (?) LIMIT 5');
        paraArry.push(paraStmt.all(i));
        allStories[i - 1]['paragraphs'] = []; // set a blank array to put all paragraphs in
        
    };

    // Store the first five(if that many) paragraphs to each story object
    for(let i = 1; i < allStories.length; i++) {
        for(let j = 0; j < paraArry[i - 1].length; j++) {
            if(allStories[i - 1]['id'] == paraArry[i - 1][i - 1]['stories_id']) {
                allStories[i - 1]['paragraphs'].push(paraArry[i - 1][i - 1]['content'])
            };
        };
    };

    
    db.close();
    return(allStories);
};

