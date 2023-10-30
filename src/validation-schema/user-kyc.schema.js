const { query } = require("express-validator");

const uploadDocumentsSchema = [
  query("type")
    .isString()
    .notEmpty()
    .withMessage("Document type must be provided!"),
];

module.exports = {
  uploadDocumentsSchema,
};
