const { default: axios } = require("axios");

async function axiosAPI({
  baseURL,
  url,
  method = "GET",
  headers = {},
  queryParams = {},
  requestBody = {},
}) {
  const config = {
    baseURL,
    url,
    method,
    headers,
    params: queryParams,
    data: requestBody,
  };
  const response = await axios.request(config);
  return response.data;
}

module.exports = {
  axiosAPI,
};
