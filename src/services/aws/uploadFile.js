const s3 = require("../../configurations/aws");

async function uploadFile({
  bucketName = "adumcar",
  file,
  newFilePath,
  ContentType,
}) {
  try {
    const params = {
      Bucket: bucketName,
      Body: file,
      Key: newFilePath,
      ContentType,
    };

    const data = await s3.upload(params).promise();

    return data;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
}

module.exports = uploadFile;
