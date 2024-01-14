const router = require('./index')
const { getArtistDetails, getArtistTopTracks, getArtistAlbums } = require('../controllers/artists/index')
const trycatch = require('../middleware/trycatch')

router.get('/:artist_id/details', trycatch(getArtistDetails));
router.get('/:artist_id/top-tracks', trycatch(getArtistTopTracks));
router.get('/:artist_id/albums', trycatch(getArtistAlbums));


module.exports = {
    route:router
}