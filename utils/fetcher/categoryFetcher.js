const fetcher = require('./index')
const {apiBaseURL} = require('../../constants')

const categoryFetcher = async (url, options) => {
    return await fetcher(`${apiBaseURL}browse/categories${url}`, options)
}

module.exports = categoryFetcher
