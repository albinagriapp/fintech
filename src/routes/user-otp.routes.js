const otpController = require("../controllers/user-otp.controller");
const {
  sendUserOTPSchema,
  verifyUserOTPSchema,
} = require("../validation-schema/user-otp.schema");
const router = require("express").Router();
const { validator } = require("../middlewares/validator");

router.post("/send", sendUserOTPSchema, validator, otpController.sendUserOTP);
router.post(
  "/verify",
  verifyUserOTPSchema,
  validator,
  otpController.verifyUserOTP
);

module.exports = router;
