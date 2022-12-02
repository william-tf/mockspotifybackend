const playbackControllers = require('./playback/playbackController')
const authControllers = require('./auth/authControllers')

module.exports = {
    ...playbackControllers,
    ...authControllers
}