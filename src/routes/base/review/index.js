var router = require("express").Router();
var review = require('../../../controllers/v1/review/review.controller')

var valid1 = ["630","300"]
var valid2 = ["130","75"]
var valid3 = ["192","110"]
var valid4 = ["192","192"]

router.get("/o/:q/:file", review.original);
router.get("/:w/:h/:file", (req, res ,next) => {
    var {h,w,file} = req.params;

    if( (valid1.includes(h) & valid1.includes(w)) || (valid2.includes(h) & valid2.includes(w)) || (valid3.includes(h) & valid3.includes(w)) || (valid4.includes(h) & valid4.includes(w))){
        next();
    }else{
        res.status(200).json({msg:"Unconventional sizes"})
    }


}, review.output);


module.exports = router;
