const router = require('./index')
const { getCurrentPlaybackState, getAvailableDevices, transferDevice, resumePlayer, pausePlayer, skipToNext, skipToPrevious, addItemsToQueue, fetchQueue, adjustVolume } = require('../controllers');
const trycatch = require('../middleware/trycatch');

router.get('/current-state', trycatch(getCurrentPlaybackState));
router.get('/device-list', trycatch(getAvailableDevices));
router.post('/transfer-device', trycatch(transferDevice));
router.post('/resume', trycatch(resumePlayer));
router.post('/pause', trycatch(pausePlayer));
router.post('/next', trycatch(skipToNext));
router.post('/previous', trycatch(skipToPrevious));
router.get('/queue', trycatch(fetchQueue))
router.post('/queue', trycatch(addItemsToQueue));
router.post('/volume', trycatch(adjustVolume));

module.exports = {
    route:router
}