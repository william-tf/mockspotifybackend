const {playbackFetcher} = require('../../utils');
const getAuthHeader = (req) => ({ "Authorization":req.headers.authorization });

// TODO account for different responses in all playback requests 
const getCurrentPlaybackState = async (req, res) => (
    await playbackFetcher(`?${req.query.market ?? "US"}`, options)
    .then(res => res.json())
    .then(response => {
        //what to send back to the front end
        res.status(200).send(response)
    })
    .catch(err => res.status(400).send({message:'ur playback session is fucked and/or active.', spotify_error:err})))

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

const transferDevice = async (req, res) => {
    const body = JSON.stringify(req.body);
    const options = {
        method: "PUT",
        headers: {
            "Authorization": req.headers.authorization
        },
        body
    }
    
    await playbackFetcher('', options)
        .then(data => {
            console.log('data', data.statusText)
            res.status(204).send({ statusText: data.statusText})
        })
        .catch(err => res.status(400).send(err))
}

const playTrack = async (req, res) => {
    const device_id = req.query.device_id;
    const body = JSON.stringify(req.body);
    const options = {
        method: 'PUT',
        headers: {
            ...getAuthHeader(req)
        },
        body
    }

    await playbackFetcher(`/play?device_id=${device_id}`, options)
        .then((response) => {
            console.log('response', {response, options, device_id, })
            res.status(200).send('Success')
        })
        .catch(err => res.status(400).send({ spotify_error: err }))
}

const pauseTrack = async (req, res) => {
    const device_id = req.query.device_id;
    const options = {
        method: 'PUT',
        headers: {
            ...getAuthHeader(req)
        }
    }

    await playbackFetcher(`/pause?device_id=${device_id}`, options)
        .then((response) => {
            console.log('response', {response, options, device_id, })
            res.status(200).send('Success')
        })
        .catch(err => res.status(400).send({ spotify_error: err }))
}

module.exports = {
    getCurrentPlaybackState,
    getAvailableDevices,
    transferDevice,
    playTrack,
    pauseTrack
}