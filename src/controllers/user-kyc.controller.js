const { logger } = require("../../winston");
const {
  updateUserPersonalInfoService,
  updateUserOccupationDetailsService,
  uploadUserDocumentsService,
  getUserKycDetailsService,
} = require("../services/user-kyc.service");

async function updateUserPersonalInfo(req, res) {
  try {
    const response = await updateUserPersonalInfoService(
      req?.user?.userId,
      req?.user?.mobileNumber,
      req.body
    );
    return res.status(response.status).json(response);
  } catch (err) {
    logger.info(err);
    return res.status(500).json("something went wrong");
  }
}

async function updateUserOccupationDetails(req, res) {
  try {
    const response = await updateUserOccupationDetailsService(
      req?.user?.userId,
      req.body
    );
    return res.status(response.status).json(response);
  } catch (err) {
    logger.info(err);
    return res.status(500).json("something went wrong");
  }
}

async function uploadUserDocuments(req, res) {
  try {
    if (!req.files.document) {
      return res.status(400).json({ message: "No files were uploaded" });
    }
    const response = await uploadUserDocumentsService(
      req?.user?.userId,
      req.files.document,
      req.query
    );
    return res.status(response.status).json(response);
  } catch (err) {
    logger.info(err);
    return res.status(500).json("something went wrong");
  }
}

async function getUserKycDetails(req, res) {
  try {
    const MobileNumber = req?.user?.mobileNumber;
    const response = await getUserKycDetailsService(MobileNumber);
    return res.status(response.status).json(response);
  } catch (err) {
    logger.info(err);
    return res.status(500).json("something went wrong");
  }
}

module.exports = {
  updateUserPersonalInfo,
  updateUserOccupationDetails,
  uploadUserDocuments,
  getUserKycDetails
};
