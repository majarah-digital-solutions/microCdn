// var upload = require('../../../utils/upload.utils')
const sharp = require('sharp');
var sizeOf = require('buffer-image-size');
const { Buffer } = require('node:buffer');

const { promisify } = require('util');
const fs = require('fs');
const convert = require('heic-convert');

const TEMP_DIR = '../../../../../public/tmp/';
// if (!fs.existsSync(TEMP_DIR)) {
//   fs.mkdirSync(TEMP_DIR);
// }

module.exports = async (req, res, next) => {
    const {chunk, chunkIndex, numChunks, fileId} = req.fields

  // Store the chunk in the temporary directory
  const chunkFilename = `${TEMP_DIR}/${fileId}-${chunkIndex}`;

  fs.writeFileSync(chunkFilename, chunk);

  res.status(200).json({
      test:"etst"
  })
}