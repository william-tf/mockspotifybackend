const router = require('./index');
const { getCurrentUserPlaylists, getCurrentUserProfile, getCurrentUserTopItems } = require('../controllers/profile/profileController');
const { getPlaylistImages } = require('../controllers/playlist/playlistController');

router.get('/playlists', getCurrentUserPlaylists);
router.get('/playlists', getPlaylistImages);
router.get('/profile', getCurrentUserProfile);
router.get('/profile/top', getCurrentUserTopItems);


module.exports = { route: router }