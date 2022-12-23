// var upload = require('../../../utils/upload.utils')
const sharp = require('sharp');
var sizeOf = require('buffer-image-size');

const { promisify } = require('util');
const fs = require('fs');
const convert = require('heic-convert');

module.exports = async (req, res, next) => {
        var arrayResponse = [];
        for (const element of req.files) {
            console.log(element)
            var buffer = element.buffer;
            
            if(element.mimetype.split("/")[1] === "heic"){
                buffer = await convert({
                  buffer: buffer, // the HEIC file buffer
                  format: 'JPEG',      // output format
                  quality: 1           // the jpeg compression quality, between 0 and 1
                });
            }


            var imageSize = sizeOf(buffer);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + Math.round(Math.random() * 1E9) + ".png"   
            await sharp(buffer)
                .flatten( { background: '#fff' } )
                // .composite([
                //     { input: './public/logo.svg',  top: (300-60), left: (10) , blend: "atop"}
                // ])
                .sharpen()
                .withMetadata()
                .webp( { quality: 80 } )
                // .resize(630,300)
                .toFile(`./public/images/${uniqueSuffix}`).then((output) => {
                    arrayResponse.push(uniqueSuffix);
                });
          }
    
    res.status(200).json({data:arrayResponse})
}