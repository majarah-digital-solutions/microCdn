var router = require("express").Router();
var upload = require('../../../controllers/v1/upload/upload.controller.js')
const multer  = require('multer')


const storage = multer.memoryStorage();
const filter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === 'image') {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed!"));
    }
};

const imageUploader = multer({
    storage,
    fileFilter: filter
});

router.post("/", imageUploader.array("files") , upload.insert);

module.exports = router;
