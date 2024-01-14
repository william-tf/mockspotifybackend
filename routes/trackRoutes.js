const router = require('./index');
const { getRecommendations } = require('../controllers/tracks/trackControllers')
const trycatch = require('../middleware/trycatch');

router.get('/recommendations', trycatch(getRecommendations));

module.exports = { route: router }