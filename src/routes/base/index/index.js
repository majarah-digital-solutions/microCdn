var router = require("express").Router();

router.get("/", (req, res, next) => {
    // res.render("index",{
    //     title:"Majarah",
    // })
    res.redirect("https://adumcar.com")
});

module.exports = router;
