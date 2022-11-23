const getParams = () => {
  const scope = `user-read-private user-read-email`;
  const params = new URLSearchParams();
  params.append('response_type', 'code');
  params.append('client_id', client_id)
  params.append('scope', scope)
  params.append('redirect_uri', redirect_uri)

  // TODO create random string generator for state
  params.append('state', 'thisisstate')
  return params.toString();
}

const encodeFormData = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

module.exports = {
  getParams,
  encodeFormData
}