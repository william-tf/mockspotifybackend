const router = require('./index')
const { getCurrentPlaybackState, getAvailableDevices, transferDevice, playTrack, pauseTrack } = require('../controllers')

router.get('/current-state', getCurrentPlaybackState);
router.get('/device-list', getAvailableDevices);
router.post('/transfer-device', transferDevice);
router.post('/play-track', playTrack);
router.post('/pause-track', pauseTrack);

module.exports = {
    route:router
}