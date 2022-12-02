const fetcher = require('./index')
const {apiBaseURL} = require('../../constants')

const searchFetcher = async (url, options) => {
    return await fetcher(`${apiBaseURL}search${url}`, options)
}

module.exports = searchFetcher