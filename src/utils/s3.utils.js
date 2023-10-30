const AWS = require("aws-sdk");
const { logger } = require("../../winston");
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.REGION,
});

const s3 = new AWS.S3();

async function uploadFileToS3({ bucketName, path, file }) {
  const params = {
    Bucket: bucketName,
    Key: path,
    Body: Buffer.from(file, "base64"),
    // ContentType: "image/jpeg",
  };

  const uploadFile = s3.upload(params).promise();
  try {
    const data = await uploadFile;
    return { key: data.Key, location: data.Location };
  } catch (error) {
    logger.info("S3 error " + error);
    throw error;
  }
}

module.exports = {
  uploadFileToS3,
};
