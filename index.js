require('dotenv').config()
const express = require('express')
const AuthRouter = require('./routes/authRoutes')
const playbackRouter = require('./routes/playbackRoutes')
const cors = require('cors')

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(cors())
app.use('/auth', cors(), AuthRouter.route)
app.use('/playback', cors(), playbackRouter.route)
app.listen(port, () => {
    console.log(`hola, world, PORT: ${port}`)
})