const router = require('./index')

const {search} = require('../controllers/search/searchController')

router.get('/v1/query', search)

module.exports = {
   route:router
}

