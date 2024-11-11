const AWS = require('aws-sdk');

// إعداد الـ AWS SDK باستخدام المفاتيح
const s3 = new AWS.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region,
});


module.exports = s3