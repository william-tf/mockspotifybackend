const router = require('./index');
const { getCurrentUserPlaylists, getCurrentUserProfile, getCurrentUserTopItems, getUserSavedTracks } = require('../controllers/profile/profileController');
const { getPlaylistImages } = require('../controllers/playlist/playlistController');

router.get('/playlists', getCurrentUserPlaylists);
router.get('/playlists', getPlaylistImages);
router.get('/profile', getCurrentUserProfile);
router.get('/profile/top', getCurrentUserTopItems);
router.get('/tracks', getUserSavedTracks)


module.exports = { route: router }