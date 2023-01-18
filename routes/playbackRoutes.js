const router = require('./index')
const { getCurrentPlaybackState, getAvailableDevices, transferDevice, resumePlayer, pausePlayer, skipToNext, skipToPrevious, addItemsToQueue, fetchQueue, adjustVolume } = require('../controllers');
const trycatch = require('../middleware/trycatch');

router.get('/current-state', trycatch(getCurrentPlaybackState));
router.get('/device-list', getAvailableDevices);
router.post('/transfer-device', transferDevice);
router.post('/resume', resumePlayer);
router.post('/pause', pausePlayer);
router.post('/next', skipToNext);
router.post('/previous', skipToPrevious);
router.get('/queue', fetchQueue)
router.post('/queue', addItemsToQueue);
router.post('/volume', adjustVolume);

module.exports = {
    route:router
}