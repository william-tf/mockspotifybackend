const { apiBaseURL } = require('../../constants');
const fetcher = require('./index');

const profileFetcher = async (url, options) => await fetcher(`${apiBaseURL}me${url}`, options);

module.exports = profileFetcher