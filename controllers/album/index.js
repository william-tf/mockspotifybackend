const SpotifyError = require("../../constants/SpotifyError");
const albumFetcher = require("../../utils/fetcher/albumFetcher");
const { getAuthHeader, getParams } = require("../utils/helpers");

const getAlbumTracks = async (req, res) => {
  const options = {
    headers: {
      ...getAuthHeader(req),
    },
  };

  await albumFetcher(`/${req.params.album_id}/tracks${getParams(req.query)}`, options)
    .then((response) => response.json())
    .then((response) => {
      if (response?.error) {
        throw new SpotifyError(response.error.message, response.error.status);
      }
      res.status(200).send(response);
    })
    .catch((err) => {
      throw new SpotifyError(
        err.message ?? "Failed to fetch album tracks",
        err.status ?? 400
      );
    });
};

const getAlbumDetails = async (req, res) => {
  const options = {
    headers: {
      ...getAuthHeader(req),
    },
  };

  await albumFetcher(`/${req.params.album_id + getParams(req.query)}`, options)
    .then((response) => response.json())
    .then((response) => {
      if (response?.error) {
        console.log('error', {error: response?.error})
        throw new SpotifyError(response.error.message, response.error.status);
      }
      res.status(200).send(response);
    })
    .catch((err) => {
        console.log('error', {err})
      throw new SpotifyError(
        err.message ?? "Failed to fetch album details",
        err.status ?? 400
      );
    });
};

module.exports = {
  getAlbumTracks,
  getAlbumDetails
};
