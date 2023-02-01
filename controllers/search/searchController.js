const {searchFetcher} = require('../../utils')
const { getAuthHeader, getParams } = require('../utils/helpers');
const SpotifyError = require('../../constants/SpotifyError')

const search = async (req, res) => {
    const options = {
        method: "GET",
        headers: {
            ...getAuthHeader(req)
        },
        
    }

    await searchFetcher(getParams(req.query), options)
    .then(response => response.json())
    .then(response => {
        if (response?.error) {
            throw new SpotifyError(response.error.message, response.error.status)
        }
        res.status(200).send(response)
    })
    .catch(err => {
        throw new SpotifyError(err.message ?? 'Failed to fetch search results.', err.status ?? 400)
    })

}

module.exports = {
    search
}