const {searchFetcher} = require('../../utils')
const { getAuthHeader, getOptionalParams } = require('../utils/helpers');

const search = async (req, res) => {
    const searchString = req.query.search
    const temp = 'album,track,playlist,artist'
    console.log('searchString', searchString)
    const options = {
        method: "GET",
        headers: {
            ...getAuthHeader(req)
        },
        
    }
    await searchFetcher(`?q=${searchString}&type=${temp}`, options)
    .then(response => response.json())
    .then(resp => res.status(200).send(resp))
    .catch(err => console.log('err', err))

}

module.exports = {
    search
}