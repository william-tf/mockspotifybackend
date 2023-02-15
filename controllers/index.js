const playbackControllers = require('./playback/playbackController')
const authControllers = require('./auth/authControllers')
const categoryControllers = require('./categories')

module.exports = {
    ...playbackControllers,
    ...authControllers,
    ...categoryControllers
}