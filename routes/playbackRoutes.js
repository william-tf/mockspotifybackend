const router = require('./index')
const { getCurrentPlaybackState, getAvailableDevices, transferDevice, playTrack, pauseTrack, skipToNext, skipToPrevious, addToQueue, fetchQueue, adjustVolume } = require('../controllers')

router.get('/current-state', getCurrentPlaybackState);
router.get('/device-list', getAvailableDevices);
router.post('/transfer-device', transferDevice);
router.post('/play-track', playTrack);
router.post('/pause-track', pauseTrack);
router.post('/next', skipToNext);
router.post('/previous', skipToPrevious);
router.get('/queue', fetchQueue)
router.post('/queue', addToQueue);
router.post('/volume', adjustVolume);

module.exports = {
    route:router
}