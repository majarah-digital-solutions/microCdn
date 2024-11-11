const s3 = require("../../configurations/aws");

async function getFile({
  bucketName = "adumcar",
  filePath,
}) {
  try {
    const params = {
      Bucket: bucketName,
      Key: filePath, // المسار إلى الملف في S3
    };

    const data = await s3.getObject(params).promise(); // جلب الملف من S3

    return data.Body; // إرجاع محتوى الملف
  } catch (error) {
    console.error("Error getting file from S3:", error);
    throw error; // رمي الخطأ في حالة حدوثه
  }
}

module.exports = getFile;