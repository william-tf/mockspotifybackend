
const fetcher = require('./index')
const {apiBaseURL} = require('../../constants')

const artistsFetcher = async (url, options) => {
    return await fetcher(`${apiBaseURL}artists${url}`, options)
}

module.exports = artistsFetcher