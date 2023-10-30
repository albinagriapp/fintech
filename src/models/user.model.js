const User = require("./Schemas/User");

async function createUser(data = {}) {
  const [user, created] = await User.findOrCreate({
    where: data,
    defaults: data,
  });
  return user || created;
}

async function updateUser(updateQuery, whereQuery) {
  await User.update(updateQuery, { where: whereQuery });
  return await User.findOne({
    where: whereQuery,
    attributes: { exclude: ["otherDetails"] },
    raw: true,
  });
}

module.exports = {
  createUser,
  updateUser,
};
