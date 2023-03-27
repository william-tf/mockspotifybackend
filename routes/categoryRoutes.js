const router = require('./index')
const { getCategories, getCategory } = require('../controllers')
const trycatch = require('../middleware/trycatch')

router.get('/all', trycatch(getCategories))
router.get('/category/:category_id', trycatch(getCategory))

module.exports = {
    route:router
}