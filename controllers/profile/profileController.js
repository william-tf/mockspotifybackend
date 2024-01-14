const SpotifyError = require('../../constants/SpotifyError');
const profileFetcher = require('../../utils/fetcher/profileFetcher');
const { getAuthHeader } = require('../utils/helpers');
const { getParams } = require('../utils/helpers');

const getCurrentUserPlaylists = async (req, res, next) => {
  const options = {
    headers: {
      ...getAuthHeader(req)
    }
  }

  await profileFetcher('/playlists', options)
    .then(response => response.json())
    .then(response => {
      if (response?.error) {
        throw new SpotifyError(response.error.message, response.error.status);
      }
      res.status(200).send(response);
    })
    .catch(err => {
      throw new SpotifyError(err.message ?? 'Failed to fetch profile', err.status ?? 400);
    })

}

const getCurrentUserProfile = async (req, res) => {
  const options = {
    headers: {
      ...getAuthHeader(req)
    }
  }

  await profileFetcher('', options)
  .then(response => response.json())
  .then(response => {
    if (response.error) {
      throw new SpotifyError(response.error.message, response.error.status);
    }
    res.status(200).send(response)
  })
  .catch(err => {
    throw new SpotifyError(err.message?? 'Failed to fetch profile', err.status ?? 400);
  })
}

const getCurrentUserTopItems = async (req, res) => {
  const { type, ...rest } = req.query;
  const options = {
    headers: {
      ...getAuthHeader(req)
    }
  }
  const allowedTypes = ["artists", "tracks"]
  if (!allowedTypes.includes(type)) {
    throw new SpotifyError('Invalid type.', 400)
  }

  await profileFetcher(`/top/${type + getParams(rest)}`, options)
  .then(response => response.json())
  .then(response => {
    if (response?.error) {
      throw new SpotifyError(response.error.message, response.error.status);
    }
    res.status(200).send(response)
  })
  .catch(err => {
    throw new SpotifyError(err.message?? 'Failed to fetch top items', err.status ?? 400);
  })
}

const getUserSavedTracks = async (req, res) => {
  const options = {
    headers: {
      ...getAuthHeader(req)
    }
  }

  await profileFetcher(`/tracks${getParams(req.query)}`, options)
  .then(response => response.json())
  .then(response => {
    if (response?.error) {
      throw new SpotifyError(response.error.message, response.error.status);
    }
    let message = 'Successfully fetched user saved tracks.';
    const status = response?.status ?? 200;

    res.status(status).send({ ...response, message })
  })
  .catch(err => {
    throw new SpotifyError(err.message ?? 'Failed to fetch user saved tracks.', err.status ?? 400);
  })
}

const getFollowedArtists = async (req, res) => 
  await profileFetcher(`/following${getParams({ type: 'artist', ...req.query })}`, { headers: {...getAuthHeader(req)}})
    .then(response => response.json())
    .then((response) => {
      if (response?.error) {
        throw new SpotifyError(response.error.message, response.error.status)
      }

      res.status(200).send(response)
    })
    .catch(err => {
      throw new SpotifyError(err.message ?? 'Failed to fetch followed artists.', err.status ?? 400)
    })


const getSavedAlbums = async (req, res) => 
  await profileFetcher(`/albums${getParams(req.query)}`, { headers: {...getAuthHeader(req)}})
    .then(response => response.json())
    .then((response) => {
      if (response?.error) {
        throw new SpotifyError(response.error.message, response.error.status)
      }

      res.status(200).send(response)
    })
    .catch(err => {
      throw new SpotifyError(err.message ?? 'Failed to fetch saved albums.', err.status ?? 400)
    })

module.exports = {
  getCurrentUserPlaylists,
  getCurrentUserProfile,
  getCurrentUserTopItems,
  getUserSavedTracks,
  getFollowedArtists,
  getSavedAlbums
}