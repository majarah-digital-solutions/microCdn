var express = require('express');
var router = express.Router();
const fs = require('fs');
const multer  = require('multer')
const Jimp = require('jimp');

const storage = multer.memoryStorage();
const imageUploader = multer({
    storage,
    limits: { fieldSize: 25 * 1024 * 1024 }
});

const {Buffer} = require('node:buffer');
const convert = require('../../utils/sharp/convert');
/* GET home page. */

// const TEMP_DIR = 'public/temp';
// const IMAGES_DIR = 'public/images';
// if (!fs.existsSync(TEMP_DIR)) {
//     fs.mkdirSync(TEMP_DIR);
//   }
  
router.post('/', async (req, res, next) => {
  const {chunkindex, numchunks, fileid} = req.headers
  const chunkFilename = `${TEMP_DIR}/${chunkindex}-${fileid}`;
  var fileName = 'pendding',isLastChunk = false;

  fs.writeFileSync(chunkFilename, req.body)

  if (+chunkindex === numchunks - 1) {
    isLastChunk = true
    const chunks = [];
    for (let i = 0; i < numchunks; i++) {
      chunks.push(fs.readFileSync(`${TEMP_DIR}/${i}-${fileid}`));
    }
    const combinedBuffer = Buffer.concat(chunks);

    fileName = await convert({
      buffer:combinedBuffer,
      path:IMAGES_DIR,
      quality:70
    })

    // Remove the chunked files
    for (let i = 0; i < numchunks; i++) {
      fs.unlinkSync(`${TEMP_DIR}/${i}-${fileid}`);
    }
  }

  res.status(200).json({
    status: 200,
    fileNameUploaded:fileName,
    isLastChunk,
    numchunks,
    chunkindex,
    fileid
  });
});
module.exports = router;
