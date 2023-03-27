
const SpotifyError = require("../../constants/SpotifyError");
const { artistsFetcher } = require( "../../utils");
const { getAuthHeader } = require("../utils/helpers");

const getArtistDetails = async (req, res) => {
    await artistsFetcher(`/${req.params.artist_id}`, {
        headers: {
            ...getAuthHeader(req)
        }
    })
        .then((response) => response.json())
        .then((response) => {
            if (response?.error) {
                throw new SpotifyError(response.error.message, response.error.status);
            }
            res.status(200).send(response);
        })
        .catch(err => {
            throw new SpotifyError(err.message ?? 'Failed to fetch artist details.', err.status ?? 400)
        })
}

const getArtistTopTracks = async (req, res) => {
    await artistsFetcher(`/${req.params.artist_id}/top-tracks?country=${req.params.country ?? 'US'}`, {
        headers: {
            ...getAuthHeader(req)
        }
    })
        .then((response) => response.json())
        .then((response) => {
            console.log({response})
            if (response?.error) {
                throw new SpotifyError(response.error.message, response.error.status);
            }
            res.status(200).send(response);
        })
        .catch(err => {
            throw new SpotifyError(err.message ?? 'Failed to fetch artist top tracks.', err.status ?? 400)
        })
}

const getArtistAlbums = async (req, res) => {
    await artistsFetcher(`/${req.params.artist_id}/albums`, {
        headers: {
            ...getAuthHeader(req)
        }
    })
        .then((response) => response.json())
        .then((response) => {
            if (response?.error) {
                throw new SpotifyError(response.error.message, response.error.status);
            }
            res.status(200).send(response);
        })
        .catch(err => {
            throw new SpotifyError(err.message ?? 'Failed to fetch artist albums.', err.status ?? 400)
        })
}

module.exports = {
    getArtistDetails,
    getArtistTopTracks,
    getArtistAlbums
}