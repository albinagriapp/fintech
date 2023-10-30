function _200({ message = "success", data = [] }) {
  return {
    status: 200,
    message,
    data,
  };
}
function _400({ message = "Bad request", errors = null }) {
  return {
    status: 400,
    message,
    errors,
  };
}

function _500() {
  return {
    status: 500,
    message: "Internal server error",
  };
}

module.exports = { _200, _400, _500 };
