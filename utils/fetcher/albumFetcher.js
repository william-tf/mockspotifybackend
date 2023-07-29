const { apiBaseURL } = require('../../constants');
const fetcher = require('./index');

const albumFetcher = async (url, options) => await fetcher(`${apiBaseURL}albums${url}`, options);

module.exports = albumFetcher