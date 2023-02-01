const SpotifyError = require("../../constants/SpotifyError");
const { playbackFetcher } = require("../../utils");
const { getAuthHeader, getOptionalParams } = require("../utils/helpers");

// TODO account for different responses in all playback requests
const getCurrentPlaybackState = async (req, res) =>
  await playbackFetcher(`?${req.query.market ?? "US"}`, {
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
  const device_id = req.query.device_id;
  const body = JSON.stringify(req.body);
  const options = {
    method: "PUT",
    headers: {
      ...getAuthHeader(req),
    },
    body,
  };
  const optionalParams = getOptionalParams([{ device_id }]);
  await playbackFetcher(`/play${optionalParams}`, options)
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
  const device_id = req.query.device_id;
  const options = {
    method: "PUT",
    headers: {
      ...getAuthHeader(req),
    },
  };
  const optionalParams = getOptionalParams([{ device_id }]);

  await playbackFetcher(`/pause${optionalParams}`, options)
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
  const device_id = req.query.device_id;
  const options = {
    method: "POST",
    headers: {
      ...getAuthHeader(req),
    },
  };
  const optionalParams = getOptionalParams([{ device_id }]);

  await playbackFetcher(`/next${optionalParams}`, options)
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
  const device_id = req.query.device_id;
  const options = {
    method: "POST",
    headers: {
      ...getAuthHeader(req),
    },
  };
  const optionalParams = getOptionalParams([{ device_id }]);

  await playbackFetcher(`/previous${optionalParams}`, options)
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
  const { uri, device_id } = req.query;
  const options = {
    method: "POST",
    headers: {
      ...getAuthHeader(req),
    },
  };
  const params = getOptionalParams([{ uri }, { device_id }]);

  await playbackFetcher(`/queue${params}`, options)
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
  const { device_id } = req.query;
  const { items } = req.body;

  const options = {
    method: "POST",
    headers: {
      ...getAuthHeader(req),
    },
  };

  const promiseIterable = items.map(async (uri) => {
    const params = getOptionalParams([{ uri }, { device_id }]);
    await playbackFetcher(`/queue${params}`, options);
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
  const volume_percent = req.query.volume_percent;
  const device_id = req.query.device_id;
  const options = {
    method: "PUT",
    headers: {
      ...getAuthHeader(req),
    },
  };
  const params = getOptionalParams([{ volume_percent }, { device_id }]);
  await playbackFetcher(`/volume${params}`, options)
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
