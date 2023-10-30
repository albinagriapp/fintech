const { body } = require("express-validator");
const sendUserOTPSchema = [
  body("mobileNumber")
    .isString()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be a string of exactly 10 characters."),
];

const verifyUserOTPSchema = [
  body("mobileNumber")
    .isString()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be a string of exactly 10 characters."),
  body("otp").isString().notEmpty().withMessage("OTP must be provided!"),
];

module.exports = {
  sendUserOTPSchema,
  verifyUserOTPSchema,
};
