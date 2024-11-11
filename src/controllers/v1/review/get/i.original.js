const getFile = require('../../../../services/aws/readFile');
module.exports = async (req, res, next) => {
  res.removeHeader('Transfer-Encoding');
  res.removeHeader('X-Powered-By');
  const { file } = req.params;
  try {
    const data = await getFile({ filePath: `uploads/images/${file}` });
    res.setHeader('Content-Type', 'image/webp');
    res.send(data);
  } catch (error) {
    console.error("Error retrieving file from S3:", error);
    res.status(404).send("File not found");
  }
};