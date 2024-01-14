const fetcher = require("../../utils/fetcher")
const { apiBaseURL } = require("../../constants")
const { getAuthHeader, getParams } = require("../utils/helpers")
const SpotifyError = require("../../constants/SpotifyError")

const getRecommendations = async (req, res) => {
  const options = {
    headers: {
      ...getAuthHeader(req)
    }
  }
  await fetcher(`${apiBaseURL + 'recommendations' + getParams(req.query)}`, options)
  .then(response => response.json())
  .then(response => {
    if (response?.error) {
      throw new SpotifyError(response.error.message, response.error.status);
    }
    res.status(200).send(response)
  })
  .catch(err => {
    throw new SpotifyError(err.message?? 'Failed to fetch recommendations', err.status ?? 400);
  })
}

module.exports = {
    getRecommendations,
}