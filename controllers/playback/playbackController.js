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
      //what to send back to the front end
      res.status(200).send(response);
    })
    .catch((err) =>
      res
        .status(400)
        .send({
          message: "ur playback session is fucked and/or active.",
          spotify_error: err,
        })
    );

const getAvailableDevices = async (req, res) => {
  const options = {
    headers: {
      Authorization: req.headers.authorization,
    },
  };

  await playbackFetcher("/devices", options)
    .then((res) => res.json())
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => res.status(400).send(err));
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
      console.log("data", data.statusText);
      res.status(204).send({ statusText: data.statusText });
    })
    .catch((err) => res.status(400).send(err));
};

const playTrack = async (req, res) => {
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
      console.log("response", { optionalParams, response });

      res.status(200).send("Success");
    })
    .catch((err) => res.status(400).send({ spotify_error: err }));
};

const pauseTrack = async (req, res) => {
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
      console.log("response", { response, options, device_id });
      res.status(200).send(response);
    })
    .catch((err) => res.status(400).send({ spotify_error: err }));
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
      console.log("skipToNext response", { response });
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log("skipToNext ERR", { err });
      res.status(400).send(err);
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
      console.log("skipToPrev response", { response });
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log("skipToPrev ERR", { err });
      res.status(400).send(err);
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
      console.log("queue response", { response, headers: options.headers });
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log("queue err", { err });
      res.status(400).send(err);
    });
};

const fetchQueue = async (req, res) => {
  const options = {
    headers: {
      ...getAuthHeader(req),
    },
  };

  await playbackFetcher("/queue", options)
    .then((response) => response.json())
    .then((response) => {
      console.log("queue response", { response, headers: options.headers });
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log("queue err", { err });
      res.status(400).send(err);
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
      console.log("adjustVolume response", { response });
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log("adjustVolume ERR", { err });
      res.status(400).send(err);
    });
};

module.exports = {
  getCurrentPlaybackState,
  getAvailableDevices,
  transferDevice,
  playTrack,
  pauseTrack,
  skipToNext,
  skipToPrevious,
  addToQueue,
  fetchQueue,
  adjustVolume,
};
