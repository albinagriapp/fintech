const { validationResult } = require("express-validator");
const validator = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Input parameters are invalid!",
      status: 400,
      errors: errors.array(),
    });
  }
  next();
};

module.exports = { validator };
