const UserOccupation = require("./Schemas/UserOccupationDetails");

async function upsertUserOccupationDetails(data = {}) {
  const [occupationDetails] = await UserOccupation.upsert(data);
  return occupationDetails.toJSON();
}

module.exports = {
  upsertUserOccupationDetails,
};
