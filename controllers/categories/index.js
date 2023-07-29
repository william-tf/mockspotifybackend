const SpotifyError = require("../../constants/SpotifyError");
const { categoryFetcher } = require( "../../utils");
const { getAuthHeader, getParams } = require("../utils/helpers");

const getCategories = async (req, res) => 
    await categoryFetcher(getParams(req.query), {
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
            throw new SpotifyError(err.message ?? 'Failed to fetch browse categories.', err.status ?? 400)
        })

const getCategory = async (req, res) => {
    const { category_id } = req.params
    await categoryFetcher(`/${category_id + getParams(req.query)}`, {
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
            throw new SpotifyError(err.message ?? 'Failed to fetch browse categories.', err.status ?? 400)
        })
}

const getCategoryItems = async (req, res) => {
  const { category_id } = req.params;
  const options = {
    headers: {
      ...getAuthHeader(req)
    }
  }
  
  await categoryFetcher(`/${category_id}/playlists${getParams(req.query)}`, options)
  .then(response => response.json())
  .then(response => {
    if (response?.error) {
      throw new SpotifyError(response.error.message, response.error.status);
    }
    res.status(200).send(response)
  })
  .catch(err => {
    throw new SpotifyError(err.message ?? 'Failed to fetch category playlists', err.status ?? 400);
  })
}
module.exports = {
    getCategories,
    getCategory,
    getCategoryItems
}