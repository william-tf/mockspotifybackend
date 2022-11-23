const axios = require("axios");

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri="http://localhost:8080/auth/callback"

const userLogin = async (req, res) => {
    const scope =
      "ugc-image-upload user-read-playback-state app-remote-control user-modify-playback-state playlist-read-private user-follow-modify playlist-read-collaborative user-follow-read user-read-currently-playing user-read-playback-position user-library-modify playlist-modify-private playlist-modify-public user-read-email user-top-read streaming user-read-recently-played user-read-private user-library-read";
      const params = new URLSearchParams()
      params.append('response_type', 'code')
      params.append('client_id', SPOTIFY_CLIENT_ID)
      params.append('scope', scope)
      params.append('redirect_uri', redirect_uri)
      params.append('state', 'sethballs')
      res.redirect('https://accounts.spotify.com/authorize?' + params)
      res.json({message:'hello world'})
};
const loginCallback = async (req, res) => {
    console.log('callback body', req.body)
}
module.exports = {
  userLogin,
  loginCallback
};
