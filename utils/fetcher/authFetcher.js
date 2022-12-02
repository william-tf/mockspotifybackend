const fetcher = require('./index')
const {authBaseURL} = require('../../constants')
const authFetcher = async (url, options) => {
    
    return await fetcher(`${authBaseURL}${url}`, options)
}

module.exports = authFetcher