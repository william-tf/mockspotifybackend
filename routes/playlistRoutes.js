const router = require('./index');
const { getPlaylistImages, getPlaylistItems } = require('../controllers/playlist/playlistController');

router.get('/playlist/images', getPlaylistImages);
router.get('/playlist/items', getPlaylistItems);

module.exports = { route: router }