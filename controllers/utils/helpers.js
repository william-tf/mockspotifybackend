const getOptionalParams = (optionalParams = []) => {
  const paramsToUse = optionalParams.filter(p => Boolean(p));
  if (paramsToUse.length === 0) {
    return '';
  }
  const params = new URLSearchParams();

  for (const param of params) {
    params.append(Object.keys(param)[0], param);
  }

  return params.toString();
}

const getAuthHeader = (req) => ({ "Authorization":req.headers.authorization });

module.exports = {
  getOptionalParams,
  getAuthHeader
}