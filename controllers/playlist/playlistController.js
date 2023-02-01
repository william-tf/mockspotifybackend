const SpotifyError = require('../../constants/SpotifyError');
const playlistFetcher = require('../../utils/fetcher/playlistFetcher');
const { getAuthHeader } = require('../utils/helpers');

const getPlaylistItems = async (req, res) => {
  const { playlist_id } = req.query;
  const options = {
    headers: {
      ...getAuthHeader(req)
    }
  }

  await playlistFetcher(`/${playlist_id}/tracks`, options)
  .then(response => response.json())
  .then(response => {
    if (response?.error) {
      throw new SpotifyError(response.error.status, response.error.message);
    }
    res.status(200).send(response)
  })
  .catch(err => {
    throw new SpotifyError(err.message ?? 'Failed to fetch playlist', err.status ?? 400);
  })
}

const getPlaylistImages = async (req, res) => {
  const playlists = req.playlists ?? []
  const options = {
    headers: {
      ...getAuthHeader(req)
    }
  }

  for (let i = 0; i < playlists.length; i++) {
    await playlistFetcher(`/${playlists[i].id}/images`, options)
      .then(response => response.json())
      .then(response => {
        if (response?.error) {
          throw new SpotifyError(response.error.status, response.error.message)
        }
        const images = response;
        playlists[i] = { ...playlists[i], images }
      })
      .catch(err => {
        throw new SpotifyError(err.message?? 'Failed to fetch playlist images', err.status ?? 400);
      })
  }

  res.status(200).send(playlists)
}

module.exports = {
  getPlaylistImages,
  getPlaylistItems
}