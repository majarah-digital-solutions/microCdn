const router = require("express").Router();

/* GET users listing. */

router.use("/upload", require("./upload"));
router.use("/", require("./review"));
router.use("/", require("./index/index"));

module.exports = router;