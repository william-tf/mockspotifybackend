const authFetcher = require('./fetcher/authFetcher');
const playbackFetcher = require('./fetcher/playbackFetcher');
const searchFetcher = require('./fetcher/searchFetcher');
const categoryFetcher = require('./fetcher/categoryFetcher');
const artistsFetcher = require('./fetcher/artistFetcher');

module.exports = {
  authFetcher,
  playbackFetcher,
  searchFetcher,
  categoryFetcher,
  artistsFetcher
}