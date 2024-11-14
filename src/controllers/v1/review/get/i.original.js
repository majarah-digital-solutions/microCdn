const getFile = require('../../../../services/aws/readFile');
const crypto = require('crypto');

module.exports = async (req, res, next) => {
  res.removeHeader('Transfer-Encoding');
  res.removeHeader('X-Powered-By');
  const { file } = req.params;

  try {
    const data = await getFile({ filePath: `uploads/images/${file}` });
    const etag = crypto.createHash('md5').update(data).digest('hex');

    // تحقق إذا كان الـ ETag الخاص بالملف هو نفسه المرسل من الـ client لتجنب إعادة تحميل الملف
    if (req.headers['if-none-match'] === etag) {
      return res.status(304).end(); // يرسل استجابة 304 - Not Modified
    }

    // إعداد الكاشينج
    res.setHeader('Content-Type', 'image/webp');
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // عام ولمدة سنة
    res.setHeader('ETag', etag);

    res.send(data);
  } catch (error) {
    console.error("Error retrieving file from S3:", error);
    res.status(404).send("File not found");
  }
};