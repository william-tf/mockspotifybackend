const router = require('./index');
const { getCurrentUserPlaylists, getCurrentUserProfile, getCurrentUserTopItems, getUserSavedTracks, getFollowedArtists, getSavedAlbums } = require('../controllers/profile/profileController');
const { getPlaylistImages } = require('../controllers/playlist/playlistController');
const trycatch = require('../middleware/trycatch');

router.get('/playlists', trycatch(getCurrentUserPlaylists));
router.get('/playlists', trycatch(getPlaylistImages));
router.get('/profile', trycatch(getCurrentUserProfile));
router.get('/profile/top', trycatch(getCurrentUserTopItems));
router.get('/followed/tracks', trycatch(getUserSavedTracks));
router.get('/followed/artists', trycatch(getFollowedArtists));
router.get('/followed/albums', trycatch(getSavedAlbums));


module.exports = { route: router }