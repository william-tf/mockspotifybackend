const querystring = require('querystring');
const fetch = require('node-fetch');
const { getParams, encodeFormData } = require('./helpers/auth');

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.LOGIN_CALLBACK;

const userLogin = async (req, res) => {
  const params = getParams();

  res.redirect(`https://accounts.spotify.com/authorize?${params}`)
};

const fetchAccessToken = async (req, res) => {
  const { code = null , state = null } = req.query;

  if (state === null) {
    // TODO redirects to page indicating login was unsuccessful
    // ? should we add logic to remove all auth information and require login again?
      // ? that logic could be in client on that error page
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {

    const body = {
      grant_type: 'authorization_code',
      code,
      redirect_uri,
      client_id,
      client_secret,
    }
  // TODO move this to a services file along with other API requests
    await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      },
      body: encodeFormData(body)
    })
    .then(response => response.json())
    .then(data => {
      res.cookie('access_token', JSON.stringify(data))
      res.redirect('http://localhost:3000/yooo')

      // TODO do something here (add logic to determine bad response)
      // ? log to splunk (or other logging/monitoring service)
      // ? redirect to error page
      // ! res.redirect('http://localhost:3000/sadday')
    });
  }
}

module.exports = {
  userLogin,
  fetchAccessToken
};
