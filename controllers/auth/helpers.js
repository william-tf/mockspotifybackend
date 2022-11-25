const { login_success_redirect, client_id } = require("../../constants/variables");

const getRandomString = (len = 0) => {
  const availableChars = 
    ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9'];
  let randomString = '';

  for (let i = 0; i < len; i++) {
    randomString += availableChars[Math.floor(Math.random() * availableChars.length)];
  }

  return randomString;
}

// TODO pass map, iterate through keys to append params so this can be used wherever needed
const getParams = () => {
  const scope = 
    `user-modify-playback-state
    user-read-playback-state
    user-read-currently-playing
    user-library-modify
    user-library-read
    user-top-read
    user-follow-modify
    user-follow-read
    user-read-recently-played
    user-read-playback-position
    user-library-modify
    user-library-read
    user-read-email
    user-read-private
    playlist-read-private
    playlist-modify-public
    playlist-modify-private
    playlist-read-collaborative
    ugc-image-upload
    app-remote-control
    streaming`;
  const state = getRandomString(10);
  const params = new URLSearchParams();

  params.append('response_type', 'code');
  params.append('client_id', client_id)
  params.append('scope', scope)
  params.append('redirect_uri', login_success_redirect)
  params.append('state', state)

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