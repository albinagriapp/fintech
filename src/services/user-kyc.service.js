const { createUserDocument } = require("../models/user-documents");
const {
  upsertUserOccupationDetails,
} = require("../models/user-occupation-details");
const { updateUser } = require("../models/user.model");
const { axiosAPI } = require("../utils/axios-utils");
const { _200, _400 } = require("../utils/responses");
const { uploadFileToS3 } = require("../utils/s3.utils");
require("dotenv").config();

async function updateUserPersonalInfoService(userId, mobileNumber, data = {}) {
  if (!Object.keys(data).length)
    return _400({
      message: "Details must be provided!",
    });
  delete data?.mobileNumber;
  delete data?.id;
  const apiResponse = await axiosAPI({
    baseURL: process.env.BASE_URL,
    url: "/services/app/CustomerOnboardingJourney/InsertPersonalInformation",
    method: "POST",
    headers: {
      XApiKey: process.env.API_KEY,
    },
    requestBody: { ...data, customerId: userId, mobileNumber },
  });
  if (!apiResponse?.result?.status === "True") {
    return _400({ message: apiResponse?.result?.error });
  }
  data.otherDetails = JSON.stringify(data);
  const response = await updateUser(data, { id: userId });
  return _200({
    message: "Details updated succesfully!",
    data: response,
  });
}

async function updateUserOccupationDetailsService(userId, data = {}) {
  if (!Object.keys(data).length)
    return _400({
      message: "Details must be provided!",
    });
  data.otherDetails = JSON.stringify(data);
  const response = await upsertUserOccupationDetails({ userId, ...data });
  delete response?.otherDetails;
  return _200({
    message: "Occupation details updated succesfully!",
    data: response,
  });
}

async function uploadUserDocumentsService(userId, document, params) {
  let { type, documentSide = "front" } = params;
  const buffer = Buffer.from(document?.data);
  const base64 = buffer.toString("base64");
  const data = await axiosAPI({
    baseURL: process.env.BASE_URL,
    url: "/services/app/KYC/OcrPlus",
    method: "POST",
    headers: {
      XApiKey: process.env.API_KEY,
    },
    requestBody: {
      customerId: userId,
      base64,
      documentType: type,
    },
  });
  if (!data?.success || !data.result) {
    return _400({
      message: data?.error?.message,
      errors: data?.error?.validationErrors,
    });
  }
  const { key, location } = await uploadFileToS3({
    path: `${userId}/${type}-${documentSide}/${document?.name}`,
    file: base64,
    bucketName: process.env.BUCKET,
  });
  await createUserDocument({
    userId,
    type,
    documentSide,
    document: location,
    key,
  });
  return _200({
    message: "Document uploaded succesfully!",
    data: { location },
  });
}

async function getUserKycDetailsService(MobileNumber) {
  const apiResponse = await axiosAPI({
    baseURL: process.env.BASE_URL,
    url: "/services/app/CustomerOnboardingJourney/GetCustomerInformation",
    method: "GET",
    headers: {
      XApiKey: process.env.API_KEY,
    },
    queryParams: {
      MobileNumber,
    },
  });
  if (apiResponse?.result && apiResponse?.result?.object) {
    return _200({
      message: "User details fetched successfully!",
      data: apiResponse?.result?.object?.message,
    });
  }
}

module.exports = {
  updateUserPersonalInfoService,
  updateUserOccupationDetailsService,
  uploadUserDocumentsService,
  getUserKycDetailsService,
};
