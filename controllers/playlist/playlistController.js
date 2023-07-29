const SpotifyError = require('../../constants/SpotifyError');
const playlistFetcher = require('../../utils/fetcher/playlistFetcher');
const { getAuthHeader, getParams } = require('../utils/helpers');

const getPlaylistDetails = async (req, res) => {
  const { playlist_id } = req.query;
  const options = {
    headers: {
      ...getAuthHeader(req)
    }
  }

  await playlistFetcher(`/${playlist_id}`, options)
  .then(response => response.json())
  .then(response => {
    if (response?.error) {
      throw new SpotifyError(response.error.message, response.error.status);
    }
    res.status(200).send(response)
  })
  .catch(err => {
    throw new SpotifyError(err.message ?? 'Failed to fetch playlist', err.status ?? 400);
  })
}

const getPlaylistItems = async (req, res) => {
  const { playlist_id, ...rest } = req.query;
  const options = {
    headers: {
      ...getAuthHeader(req)
    }
  }
  
  await playlistFetcher(`/${playlist_id}/tracks${getParams(rest)}`, options)
  .then(response => response.json())
  .then(response => {
    if (response?.error) {
      throw new SpotifyError(response.error.message, response.error.status);
    }
    res.status(200).send(response)
  })
  .catch(err => {
    throw new SpotifyError(err.message ?? 'Failed to fetch playlist items', err.status ?? 400);
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
          throw new SpotifyError(response.error.message, response.error.status)
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
  getPlaylistDetails,
  getPlaylistImages,
  getPlaylistItems
}