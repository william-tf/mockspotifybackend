const { apiBaseURL } = require('../../constants');
const fetcher = require('./index');

const profileFetcher = async (url, options) => await fetcher(`${apiBaseURL}/albums${url}`, options);

module.exports = profileFetcher