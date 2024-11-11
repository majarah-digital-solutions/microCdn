const s3 = require("../../config/aws");

async function deleteFile({
  bucketName = "qumracloud",
  filePath,
}) {
  try {
    const params = {
      Bucket: bucketName,
      Key: filePath, // المسار إلى الملف في S3
    };

    await s3.deleteObject(params).promise(); // حذف الملف من S3
    console.log("File deleted successfully from S3");
    return true;
  } catch (error) {
    console.error("Error deleting file from S3:", error);
    throw error; // رمي الخطأ في حالة حدوثه
  }
}

module.exports = deleteFile;
