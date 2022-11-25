const { fetcher } = require('../../utils');
const { getParams, encodeFormData } = require('./helpers');
const { client_id, client_secret, login_success_redirect } = require('../../constants/variables');

const userLogin = async (req, res) => {
  const params = getParams();

  res.redirect(`https://accounts.spotify.com/authorize?${params}`)
};

const fetchAccessToken = async (req, res) => {
  const { code = null , state = null } = req.query;

  if (state === null) {
    // TODO change error msg
    // res.json({ error: { message: 'msg' } })
    res.redirect('/error');
  } else {
    const body = encodeFormData({
      grant_type: 'authorization_code',
      code,
      redirect_uri: login_success_redirect,
      client_id,
      client_secret
    });
    
    await fetcher('token', { method: 'POST', body })
    .then(response => response.json())
    .then(data => {
      res.cookie('spotify_access_token', JSON.stringify(data))
      res.redirect('http://localhost:3000/yooo')

      // TODO add logic to determine bad response
      // ? log to splunk (or other logging/monitoring service)
      // ? redirect to error page
    });
  }
}

const refreshAccessToken = async (req, res) => {
  const refresh_token = req.query.refresh_token ?? '';
  const options = {
    method: 'POST',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    body: encodeFormData({
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    }),
    json: true
  };

  await fetcher('token', options)
    .then(response => response.json())
    .then(data => res.send(data))
}

module.exports = {
  userLogin,
  fetchAccessToken,
  refreshAccessToken
};
