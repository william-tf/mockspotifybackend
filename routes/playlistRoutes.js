const router = require('./index');
const { getPlaylistImages, getPlaylistItems, getPlaylistDetails } = require('../controllers/playlist/playlistController');
const trycatch = require('../middleware/trycatch');

router.get('/playlist', trycatch(getPlaylistDetails));
router.get('/playlist/images', trycatch(getPlaylistImages));
router.get('/playlist/items', trycatch(getPlaylistItems));

module.exports = { route: router }