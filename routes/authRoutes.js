const express = require('express')
const {userLogin, loginCallback} = require('../controllers/authControllers')

const router = express.Router()


router.get('/userlogin', userLogin)
router.get('/logincallback', loginCallback)

module.exports = {
    route:router
}