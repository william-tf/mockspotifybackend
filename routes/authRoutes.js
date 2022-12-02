const router = require('./index')
const { userLogin, fetchAccessToken, refreshAccessToken } = require('../controllers')



router.get('/userlogin', userLogin)
router.get('/loggedin', fetchAccessToken)
router.get('/refresh-token', refreshAccessToken)

module.exports = {
    route:router
}