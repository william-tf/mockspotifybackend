const login_success_redirect = process.env.LOGIN_CALLBACK;
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const AuthorizationHeader = { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) }
module.exports = {
  login_success_redirect,
  client_id,
  client_secret,
  AuthorizationHeader, 
}