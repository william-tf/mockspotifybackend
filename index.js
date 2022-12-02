require('dotenv').config()
const express = require('express')
const AuthRouter = require('./routes/authRoutes')
const playbackRouter = require('./routes/playbackRoutes')
const searchRouter = require('./routes/searchRoutes')
const cors = require('cors')

const port = process.env.PORT
const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', AuthRouter.route)
app.use('/playback', playbackRouter.route)
app.use('/search', searchRouter.route)
app.listen(port, () => {
    console.log(`hola, world, PORT: ${port}`)
})