const { API_ENDPOINTS } = require("../constants/api-endpoints");
const { axiosAPI } = require("./axios-utils");
require("dotenv").config();

function generateOTP(length) {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  const randomOTP = Math.floor(Math.random() * (max - min + 1)) + min;

  const otp = String(randomOTP).padStart(length, "0");

  return otp;
}

async function sendOTP({ phoneNumber, otp }) {
  if (process.env.ENV === "development") return;
  const data = await axiosAPI({
    baseURL: API_ENDPOINTS.OTP_SERVICE_API,
    method: "POST",
    queryParams: {
      otp,
      invisible: 0,
      template_id: "",
      mobile: phoneNumber,
    },
  });
  return data;
}

module.exports = {
  generateOTP,
  sendOTP,
};
