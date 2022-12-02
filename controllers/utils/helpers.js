const getOptionalParams = (optionalParams = []) => {
  const paramsToUse = optionalParams.filter(p => {
    const key = Object.keys(p)[0];
    return Boolean(p[key]); 
  });

  if (paramsToUse.length === 0) {
    return '';
  }
  const urlParams = new URLSearchParams();

  for (const param of paramsToUse) {
    const key = Object.keys(param)[0];
    urlParams.append(key, param[key]);
  }

  const params = urlParams.toString();

  return `?${params}`;
}

const getAuthHeader = (req) => ({ "Authorization":req.headers.authorization });

module.exports = {
  getOptionalParams,
  getAuthHeader
}