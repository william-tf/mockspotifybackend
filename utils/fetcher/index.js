const fetch = require('node-fetch');

const fetcher = async (url, options = {}) => {
  options = {
    ...options,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json",
      ...options?.headers ?? {}
    }
  }
  const optionsToUse = {
    method: 'GET',
    ...options
  }

  return await fetch(url, optionsToUse)
}

module.exports = fetcher