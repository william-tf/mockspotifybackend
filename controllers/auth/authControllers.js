const { authFetcher } = require('../../utils');
const { getParams, encodeFormData } = require('./helpers');
const { client_id, client_secret, login_success_redirect, AuthorizationHeader } = require('../../constants');
const { omit } = require('rambda');

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
    
    await authFetcher('token', { method: 'POST', body })
    .then(response => response.json())
    .then(data => {
      res.cookie('spotify_access_token', JSON.stringify(omit(['scope','token_type'],data)))
      res.redirect('http://localhost:3000/home')

      // TODO add logic to determine bad response
      // ? log to splunk (or other logging/monitoring service)
      // ? redirect to error page
      
    })
    .catch(err => console.log(err))
  }
  
}

const refreshAccessToken = async (req, res) => {
  const refresh_token = req.query.refresh_token ?? '';
  const options = {
    method: 'POST',
    headers: {...AuthorizationHeader},
    body: encodeFormData({
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    }),
    json: true
  };

  await authFetcher('token', options)
    .then(response => response.json())
    .then(data => res.cookie('spotify_access_token', JSON.stringify(omit(['scope','token_type'],data))))
}

module.exports = {
  userLogin,
  fetchAccessToken,
  refreshAccessToken
};
