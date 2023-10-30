const jwt = require("jsonwebtoken");
require("dotenv").config();
async function authentication(req, res, next) {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    return res.status(401).json({ message: "Unauthorized - Missing token" });
  }
  const token = bearerToken.split(" ")[1];

  try {
    const decoded = await jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
}

module.exports = { authentication };
