const SpotifyError = require("../../constants/SpotifyError");
const { playbackFetcher } = require("../../utils");
const { getAuthHeader, getParams } = require("../utils/helpers");

const getCurrentPlaybackState = async (req, res) =>
  await playbackFetcher(getParams(req.query), {
    headers: {
      Authorization: req.headers.authorization,
    },
  })
    .then((res) => res.json())
    .then((response) => {
      if (response?.error){
        throw new SpotifyError(response.error.message, response.error.status)
      }
      res.status(200).send(response);
    })
    .catch(err => {
      throw new SpotifyError(err.message ?? 'Failed to fetch playback state.', err.status ?? 400)
    })

const getAvailableDevices = async (req, res) => {
  const options = {
    headers: {
      Authorization: req.headers.authorization,
    },
  };

  await playbackFetcher("/devices", options)
    .then((res) => res.json())
    .then((response) => {
      if (response?.error){
        throw new SpotifyError(response.error.message, response.error.status)
      }
      res.status(200).send(response);
    })
    .catch((err) => {
      throw new SpotifyError(err.message ?? 'Failed to fetch available devices.', err.status ?? 400)
    });
};

const transferDevice = async (req, res) => {
  const body = JSON.stringify(req.body);
  const options = {
    method: "PUT",
    headers: {
      Authorization: req.headers.authorization,
    },
    body,
  };

  await playbackFetcher("", options)
    .then((data) => {
      if (response?.error){
        throw new SpotifyError(response.error.message, response.error.status)
      }
      res.status(204).send({ statusText: data.statusText });
    })
    .catch((err) => {
      throw new SpotifyError(err.message ?? 'Failed to transfer device.', err.status ?? 400)
    });
};

const resumePlayer = async (req, res) => {
  const options = {
    method: "PUT",
    headers: {
      ...getAuthHeader(req),
    },
    body: JSON.stringify(req.body),
  }

  await playbackFetcher(`/play${getParams(req.query)}`, options)
    .then((response) => {
      if (response?.error){
        throw new SpotifyError(response.error.message, response.error.status)
      }
      res.status(200).send("Success");
    })
    .catch((err) => {
      throw new SpotifyError(err.message ?? 'Failed to resume player.', err.status ?? 400)
    });
};

const pausePlayer = async (req, res) => {
  const options = {
    method: "PUT",
    headers: {
      ...getAuthHeader(req),
    },
  };

  await playbackFetcher(`/pause${getParams(req.query)}`, options)
    .then((response) => {
      if (response?.error){
        throw new SpotifyError(response.error.message, response.error.status)
      }
      res.status(200).send(response);
    })
    .catch((err) => {
      throw new SpotifyError(err.message ?? 'Failed to pause player.', err.status ?? 400)
    });
};

const skipToNext = async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      ...getAuthHeader(req),
    },
  };

  await playbackFetcher(`/next${getParams(req.query)}`, options)
    .then((response) => {
      if (response?.error){
        throw new SpotifyError(response.error.message, response.error.status)
      }
      res.status(200).send(response);
    })
    .catch((err) => {
      throw new SpotifyError(err.message ?? 'Failed to skip player to next item.', err.status ?? 400)
    });
};

const skipToPrevious = async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      ...getAuthHeader(req),
    },
  };

  await playbackFetcher(`/previous${getParams(req.query)}`, options)
    .then((response) => {
      if (response?.error){
        throw new SpotifyError(response.error.message, response.error.status)
      }
      res.status(200).send(response);
    })
    .catch((err) => {
      throw new SpotifyError(err.message ?? 'Failed to skip player to previous item.', err.status ?? 400)
    });
};

const addToQueue = async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      ...getAuthHeader(req),
    },
  };

  await playbackFetcher(`/queue${getParams(req.params)}`, options)
    .then((response) => {
      if (response?.error){
        throw new SpotifyError(response.error.message, response.error.status)
      }
      res.status(200).send(response);
    })
    .catch((err) => {
      throw new SpotifyError(err.message ?? 'Failed to add item to queue.', err.status ?? 400)
    });
};

const addItemsToQueue = async (req, res) => {
  const { items } = req.body;

  const options = {
    method: "POST",
    headers: {
      ...getAuthHeader(req),
    },
  };

  const promiseIterable = items.map(async (uri) => {
    await playbackFetcher(`/queue${getParams({ uri, ...req.query })}`, options);
  });

  await Promise.all(promiseIterable)
    .then(response => {
      if (response?.error){
        throw new SpotifyError(response.error.message, response.error.status)
      }
      res.status(200).send(`Successfully queued ${items.length} item(s).`)
    })
    .catch(err => {
      throw new SpotifyError(err.message ?? 'Failed to add item(s) to queue.', err.status ?? 400)
    })
}

const fetchQueue = async (req, res) => {
  const options = {
    headers: {
      ...getAuthHeader(req),
    },
  };

  await playbackFetcher("/queue", options)
    .then((response) => response.json())
    .then((response) => {
      if (response?.error){
        throw new SpotifyError(response.error.message, response.error.status)
      }
      res.status(200).send(response);
    })
    .catch((err) => {
      throw new SpotifyError(err.message ?? 'Failed to fetch queue.', err.status ?? 400)
    });
};

const adjustVolume = async (req, res) => {
  const options = {
    method: "PUT",
    headers: {
      ...getAuthHeader(req),
    },
  };

  await playbackFetcher(`/volume${getParams(req.query)}`, options)
    .then((response) => {
      if (response?.error){
        throw new SpotifyError(response.error.message, response.error.status)
      }
      res.status(200).send(response);
    })
    .catch((err) => {
      throw new SpotifyError(err.message ?? 'Failed to adjust volume.', err.status ?? 400)
    });
};

module.exports = {
  getCurrentPlaybackState,
  getAvailableDevices,
  transferDevice,
  resumePlayer,
  pausePlayer,
  skipToNext,
  skipToPrevious,
  fetchQueue,
  adjustVolume,
  addItemsToQueue
};
