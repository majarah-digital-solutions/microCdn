var router = require("express").Router();

router.get("/", (req, res, next) => {
    res.json({
        status: "Success",
    })
});

module.exports = router;
