const sharp = require('sharp');
const convert = require('heic-convert');
const uploadFile = require('../../../../services/aws/uploadFile');

module.exports = async (req, res, next) => {
    try {
        const arrayResponse = [];

        for (const element of req.files) {
            console.log("----------------------------------------------------------------");
            console.log(element);

            let buffer = element.buffer;

            // تحويل الملفات من HEIC إلى JPEG إذا كان نوعها HEIC
            if (element.mimetype.split("/")[1] === "heic") {
                console.log("heic");
                buffer = await convert({
                    buffer: buffer,
                    format: 'JPEG',
                    quality: 1
                });
            }

            // تحويل الصورة إلى WebP وتحسين جودتها بدون الحفظ محلياً
            const processedBuffer = await sharp(buffer)
                .sharpen()
                .withMetadata()
                .webp({ quality: 80 })
                .toBuffer();

            // توليد اسم ملف فريد
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + Math.round(Math.random() * 1E9) + ".webp";

            // رفع الصورة مباشرةً إلى S3
            const s3Response = await uploadFile({
                file: processedBuffer,
                newFilePath: `uploads/test/${uniqueSuffix}`,
                ContentType: 'image/webp'
            });
            if(s3Response.Location){
                arrayResponse.push(uniqueSuffix); // إضافة رابط الصورة على S3 إلى المصفوفة
            }
        }

        res.status(200).json({ data: arrayResponse });
    } catch (error) {
        console.error("Error processing files:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};