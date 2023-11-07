const { createUser } = require("../models/user.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { _200, _400 } = require("../utils/responses");
const { axiosAPI } = require("../utils/axios-utils");
require("dotenv").config();

async function sendUserOTPService(mobileNumber) {
  const apiResponse = await axiosAPI({
    baseURL: process.env.BASE_URL,
    url: "/services/app/CustomerOnboardingJourney/SendOTPByMobileNumber",
    method: "POST",
    headers: {
      XApiKey: process.env.API_KEY,
    },
    queryParams: {
      mobileNumber,
      otpFunctionId: 10,
    },
  });
  if (!apiResponse.result || apiResponse.result.status === "False") {
    return _400({ message: "Service not available or Limit exceeded!" });
  }
  return _200({
    message: "OTP sent successfully!",
    data: apiResponse,
  });
}

async function verifyUserOTPService({ mobileNumber, otp }) {
  const apiResponse = await axiosAPI({
    baseURL: process.env.BASE_URL,
    url: "/TokenAuth/VerifyOTPForCreditLine",
    method: "POST",
    headers: {
      XApiKey: process.env.API_KEY,
    },
    queryParams: {
      MobileNumber: mobileNumber,
      otp,
      otpFunctionId: 10,
    },
  });
  if (apiResponse.result.status === "True" && apiResponse.result.object) {
    const user = await createUser({
      id: apiResponse.result.object?.customerId,
      mobileNumber,
    });
    const token = await jwt.sign(
      { userId: user.id, mobileNumber },
      process.env.SECRET,
      { expiresIn: process.env.TOKEN_EXPIRY }
    );
    return _200({
      message: "OTP verified successfully!",
      data: { token, user },
    });
  }
  return _400({
    message: apiResponse.result?.message,
  });
}

module.exports = {
  sendUserOTPService,
  verifyUserOTPService,
};
