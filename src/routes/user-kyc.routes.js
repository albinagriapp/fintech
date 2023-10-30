const kycController = require("../controllers/user-kyc.controller");
const { authentication } = require("../middlewares/auth");
const {
  uploadDocumentsSchema,
} = require("../validation-schema/user-kyc.schema");
const { validator } = require("../middlewares/validator");

const router = require("express").Router();

router.patch(
  "/update-info",
  authentication,
  kycController.updateUserPersonalInfo
);

router.post(
  "/update-occupation-details",
  authentication,
  kycController.updateUserOccupationDetails
);

router.post(
  "/upload-document",
  authentication,
  uploadDocumentsSchema,
  validator,
  kycController.uploadUserDocuments
);

router.get(
  "/details",
  authentication,
  kycController.getUserKycDetails
);

module.exports = router;
