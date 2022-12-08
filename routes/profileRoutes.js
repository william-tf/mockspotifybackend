const router = require('./index');
const { getCurrentUserPlaylists } = require('../controllers/profile/profileController');
const { getPlaylistImages } = require('../controllers/playlist/playlistController');

router.get('/playlists', getCurrentUserPlaylists);
router.get('/playlists', getPlaylistImages);

module.exports = { route: router }