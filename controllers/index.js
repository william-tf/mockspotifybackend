const playbackControllers = require('./playback/playbackController')
const authControllers = require('./auth/authControllers')
const categoryControllers = require('./categories')
const artistsControllers = require('./artists')

module.exports = {
    ...playbackControllers,
    ...authControllers,
    ...categoryControllers,
    ...artistsControllers
}