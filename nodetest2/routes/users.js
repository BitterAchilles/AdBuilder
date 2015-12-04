var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/sentlist', function(req, res) {
    var db = req.db;
    var collection = db.get('sentlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
    console.log("sentlist worked");
});


/*
 * POST to addline.
 */


router.post('/addline', function(req, res) {
    var db = req.db;
    var collection = db.get('sentlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});




module.exports = router;
