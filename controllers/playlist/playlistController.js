const playlistFetcher = require('../../utils/fetcher/playlistFetcher');
const { getAuthHeader } = require('../utils/helpers');

const getPlaylistItems = async (req, res) => {
  const { playlist_id } = req.query;
  const options = {
    headers: {
      ...getAuthHeader(req)
    }
  }

  // TODO add optional params for spotify API optional params 
  await playlistFetcher(`/${playlist_id}/tracks`, options)
  .then(response => response.json())
  .then(response => {
    // console.log('playlist items response', response)
    res.status(200).send(response)
  })
  .catch(err => {
    console.log('err playlist items response', err)
    res.status(400).send(err)
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
        const images = response;
        playlists[i] = { ...playlists[i], images }
      })
      .catch(err => {
        // ? maybe add href property of standard image indicating an error?
        playlists[i] = { ...playlists[i], images: [{ error: { message: 'Error fetching images for one or more playlists.', err } }] }
      })
  }

  res.status(200).send(playlists)
}

module.exports = {
  getPlaylistImages,
  getPlaylistItems
}