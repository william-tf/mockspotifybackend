const router = require('./index');
const { getPlaylistImages, getPlaylistItems } = require('../controllers/playlist/playlistController');
const trycatch = require('../middleware/trycatch');

router.get('/playlist/images', trycatch(getPlaylistImages));
router.get('/playlist/items', trycatch(getPlaylistItems));

module.exports = { route: router }