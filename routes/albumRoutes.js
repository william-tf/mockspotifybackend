const router = require('./index');
const { getAlbumTracks, getAlbumDetails } = require('../controllers/album');
const trycatch = require('../middleware/trycatch');

router.get('/:album_id/details', trycatch(getAlbumDetails));
router.get('/:album_id/tracks', trycatch(getAlbumTracks));

module.exports = { route: router }