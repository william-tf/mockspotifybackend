const router = require('./index')
const {getCurrentPlaybackState, getAvailableDevices} = require('../controllers')

router.get('/current-state', getCurrentPlaybackState)
router.get('/device-list', getAvailableDevices)
module.exports = {
    route:router
}