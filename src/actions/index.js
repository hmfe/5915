import fetch from 'cross-fetch';

export const REQUEST_CITIES = 'REQUEST_CITIES'
export const RECEIVE_CITIES = 'RECEIVE_CITIES'
export const CITIES_ERROR = 'CITIES_ERROR'

export const requestPosts = (query) => {
  return {
    type: REQUEST_CITIES,
    query,
  }
}

export const receiveCities = (query, json) => {
  return {
    type: RECEIVE_CITIES,
    query,
    data: json,
  }
}

export function fetchError(query) {
  return {
    type: CITIES_ERROR,
    query,
  }
}


export const fetchCities = (query) => (dispatch, getState) => {

  if (!query) return Promise.resolve();
  const cache = getState().results || {};
  if (cache[query]) return Promise.resolve();

  dispatch(requestPosts(query))

  return fetch(`https://restcountries.eu/rest/v2/capital/${query}`)
    .then(
      response => response.json(),
      () => fetchError(query)
    )
    .then(json => {
      if (json.status === 404) {
        return dispatch(receiveCities(query, []))
      }
      console.log(json);
      const filteredJson = json.filter(country => country.capital.toLowerCase().includes(query.toLowerCase())).map(country => ({ name: country.capital, numericCode: country.numericCode }))
      return dispatch(receiveCities(query, filteredJson))
    }
    )
}