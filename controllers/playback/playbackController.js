
const {playbackFetcher} = require('../../utils')



const getCurrentPlaybackState = async (req, res) => {
   
    const options = {
        headers:{
            "Authorization":req.headers.authorization,
        }
    }


    await playbackFetcher(`?${req.query.market ?? "US"}`, options)
    .then(res => res.json())
    .then(response => {
        console.log('response', response)
        //what to send back to the front end
        res.status(200).send(response)
    })
    .catch(err => res.status(400).send({message:'ur playback session is fucked and/or active.', spotify_error:err}))

}

const getAvailableDevices = async (req, res) => {

    const options = {
        headers:{
            "Authorization":req.headers.authorization,
        }
    }


    await playbackFetcher('/devices', options)
    .then(res => res.json())
    .then(response => {
        res.status(200).send(response)
    })
    .catch(err => res.status(400).send(err))
}


module.exports = {
    getCurrentPlaybackState,
    getAvailableDevices
}