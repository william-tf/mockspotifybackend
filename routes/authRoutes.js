const express = require('express')
const { userLogin, fetchAccessToken, refreshAccessToken } = require('../controllers/auth/authControllers')

const router = express.Router()


router.get('/userlogin', userLogin)
router.get('/loggedin', fetchAccessToken)
router.get('/refresh-token', refreshAccessToken)

module.exports = {
    route:router
}