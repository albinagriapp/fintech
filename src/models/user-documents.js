const UserDocument = require("./Schemas/UserDocuments");

async function createUserDocument(data = {}) {
  return UserDocument.create(data);
}

module.exports = {
  createUserDocument,
};
