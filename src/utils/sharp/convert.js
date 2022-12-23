const sharp = require("sharp");
module.exports = async ({buffer,quality = 80,resize = {h:360,w:300},path,fileName = null,fileType = 'png'}) => {
    if(!fileName){
        fileName = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + Math.round(Math.random() * 1E9) +'.'+ fileType   
    }
    return await sharp(buffer)
    .flatten( { background: '#fff' } )
    .sharpen()
    .withMetadata()
    .webp( { quality: quality } )
    // .resize(resize.w,resize.h)
    .toFile(`${path}/${fileName}`).then((output) => {
        return fileName;
    });
}