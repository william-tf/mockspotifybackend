const profileFetcher = require('../../utils/fetcher/profileFetcher');
const { getAuthHeader } = require('../utils/helpers');

const getCurrentUserPlaylists = async (req, res, next) => {
  const options = {
    headers: {
      ...getAuthHeader(req)
    }
  }

  await profileFetcher('/playlists', options)
    .then(response => response.json())
    .then(response => {
      req.playlists = response;
      next();
    })
    .catch(err => res.status(400).send(err))

}

module.exports = {
  getCurrentUserPlaylists
}