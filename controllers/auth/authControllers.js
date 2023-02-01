const { authFetcher } = require('../../utils');
const { getParams, encodeFormData } = require('./helpers');
const { client_id, client_secret, login_success_redirect, AuthorizationHeader } = require('../../constants');
const { omit } = require('rambda');
const SpotifyError = require('../../constants/SpotifyError');

const userLogin = async (req, res) => 
  res.redirect(`https://accounts.spotify.com/authorize?${getParams()}`)

const fetchAccessToken = async (req, res) => {
  const { code = null , state = null } = req.query;

  if (state === null) {
    res.redirect('/error');
    throw new SpotifyError('Unable to authenticate user with Spotify. Please try again.', 401)
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
    .then(response => {
      if (response?.error){
        throw new SpotifyError(response.error.message, response.error.status)
      }
      res.cookie('spotify_access_token', JSON.stringify(omit(['scope','token_type'], response)))
      res.redirect(process.env.AUTHENTICATED_CALLBACK)
    })
    .catch(err => {
      throw new SpotifyError(err.message ?? 'Unable to authenticate user. Failed to fetch access token.', err.status ?? 401)
    })
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
    .then(response => {
      if (response?.error){
        throw new SpotifyError(response.error.message, response.error.status)
      }
      res.cookie('spotify_access_token', JSON.stringify(omit(['scope','token_type'], response)))
    })
    .catch(err => {
      throw new SpotifyError(err.message ?? 'Unable to authenticate user. Failed to refresh access token.', err.status ?? 401)
    })
}

module.exports = {
  userLogin,
  fetchAccessToken,
  refreshAccessToken
};
