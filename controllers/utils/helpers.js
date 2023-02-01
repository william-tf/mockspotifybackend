const { isEmpty } = require("rambda");

const getParams = (params = {}) => {
  const urlParams = new URLSearchParams(params);

  return !isEmpty(urlParams) ? `?${urlParams.toString()}` : '';
}

const getAuthHeader = (req) => ({ "Authorization":req.headers.authorization });

module.exports = {
  getParams,
  getAuthHeader
}