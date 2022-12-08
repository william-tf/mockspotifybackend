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

module.exports = {
  getCurrentUserPlaylists,
  getCurrentUserProfile,
  getCurrentUserTopItems
}