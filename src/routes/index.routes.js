const router = require("express").Router();
const otpRouter = require("./user-otp.routes");
const kycRouter = require("./user-kyc.routes");

router.use("/otp", otpRouter);
router.use("/user/kyc", kycRouter);

module.exports = router;
