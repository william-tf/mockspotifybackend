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
      req.playlists = response;
      next();
    })
    .catch(err => res.status(400).send(err))

}

const getCurrentUserProfile = async (req, res) => {
  const options = {
    headers: {
      ...getAuthHeader(req)
    }
  }

  await profileFetcher('', options)
  .then(response => response.json())
  .then(response => res.status(200).send(response))
  .catch(err => res.status(400).send(err))
}

const getCurrentUserTopItems = async (req, res) => {
  const { type } = req.query;
  const options = {
    headers: {
      ...getAuthHeader(req)
    }
  }

  await profileFetcher(`/top/${type}`, options)
  .then(response => {
    console.log('json response top items', { response })
    return response.json()
  })
  .then(response => {
    console.log('top items res', { response })
    res.status(200).send(response)
  })
  .catch(err => {
    console.log('err top items', {err})
    res.status(400).send(err)
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
    let message = 'Successfully fetched user saved tracks.';
    const status = response?.status ?? 200;

    if (status === 401) {
      message = 'Unable to authenticate user token. Please refresh token, or re-login through spotify.'
    } else if (status === 403) {
      message = 'Internal API issue.'
    } else if (status === 429) {
      message = 'Spotify Web API rate limit reached or exceeded.'
    }

    res.status(status).send({ ...response, message })
  })
  .catch(err => res.status(err.status).send({ spotifyError: err, message: 'Failed to fetch user saved tracks.'}));
}

module.exports = {
  getCurrentUserPlaylists,
  getCurrentUserProfile,
  getCurrentUserTopItems,
  getUserSavedTracks
}