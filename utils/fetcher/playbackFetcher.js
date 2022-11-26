const fetcher = require('./index')
const {apiBaseURL} = require('../../constants')

const playbackFetcher = async (url, options) => {

    return await fetcher(`${apiBaseURL}me/player${url}`, options)
}

module.exports = playbackFetcher