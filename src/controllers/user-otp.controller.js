const { logger } = require("../../winston");
const {
  sendUserOTPService,
  verifyUserOTPService,
} = require("../services/user-otp.service");

async function sendUserOTP(req, res) {
  try {
    const response = await sendUserOTPService(req.body.mobileNumber);
    return res.status(response.status).json(response);
  } catch (err) {
    logger.info(err);
    return res.status(500).json("something went wrong");
  }
}
async function verifyUserOTP(req, res) {
  try {
    const { mobileNumber, otp } = req.body;
    const response = await verifyUserOTPService({ mobileNumber, otp });
    return res.status(response.status).json(response);
  } catch (err) {
    console.log(err);
    logger.info(err);
    return res.status(500).json("something went wrong");
  }
}

module.exports = {
  sendUserOTP,
  verifyUserOTP,
};
