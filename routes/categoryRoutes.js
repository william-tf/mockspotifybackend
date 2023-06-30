const router = require('./index')
const { getCategories, getCategory, getCategoryItems } = require('../controllers')
const trycatch = require('../middleware/trycatch')

router.get('/all', trycatch(getCategories))
router.get('/category/:category_id', trycatch(getCategory))
router.get('/category/items/:category_id', trycatch(getCategoryItems))

module.exports = {
    route:router
}