const router = require('./index')
const { userLogin, fetchAccessToken, refreshAccessToken } = require('../controllers')
const trycatch = require('../middleware/trycatch')



router.get('/userlogin', trycatch(userLogin))
router.get('/loggedin', trycatch(fetchAccessToken))
router.get('/refresh-token', trycatch(refreshAccessToken))

module.exports = {
    route:router
}