internalErrors = [403]
class SpotifyError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = internalErrors.includes(status) ? 'InternalError' : 'SpotifyError';
  }
}

module.exports = SpotifyError;