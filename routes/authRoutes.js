const express = require('express')
const {userLogin, fetchAccessToken} = require('../controllers/authControllers')

const router = express.Router()


router.get('/userlogin', userLogin)
router.get('/loggedin', fetchAccessToken)

module.exports = {
    route:router
}