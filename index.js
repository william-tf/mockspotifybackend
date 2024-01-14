require('dotenv').config()
const express = require('express')
const AuthRouter = require('./routes/authRoutes')
const playbackRouter = require('./routes/playbackRoutes')
const searchRouter = require('./routes/searchRoutes')
const profileRouter = require('./routes/profileRoutes')
const playlistRouter = require('./routes/playlistRoutes');
const categoryRouter = require('./routes/categoryRoutes')
const artistRouter = require('./routes/artistRoutes')
const albumRouter = require('./routes/albumRoutes')
const trackRouter = require('./routes/trackRoutes')

const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')

const port = process.env.PORT
const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }));
app.use('/auth', AuthRouter.route)
app.use('/playback', playbackRouter.route)
app.use('/search', searchRouter.route)
app.use('/current_user', profileRouter.route)
app.use('/playlists', playlistRouter.route)
app.use('/categories', categoryRouter.route)
app.use('/tracks', trackRouter.route)
app.use('/albums', albumRouter.route)
app.use('/artists', artistRouter.route)
app.use(errorHandler);

app.listen(port, () => {
    console.log(`hola, world, PORT: ${port}`)
})