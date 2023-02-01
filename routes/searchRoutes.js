const router = require('./index')

const {search} = require('../controllers/search/searchController')
const trycatch = require('../middleware/trycatch')

router.get('/v1/query', trycatch(search))

module.exports = {
   route:router
}

