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
            throw new SpotifyError(err.message ?? 'Failed to fetch browse categories.')
        })
}

module.exports = {
    getCategories,
    getCategory
}