import {
  REQUEST_CITIES,
  RECEIVE_CITIES,
  CITIES_ERROR,
} from '../actions'


const initalState = { isFetching: false, failed: false, result: {} }

function fetch(state = initalState, action
) {
  switch (action.type) {
    case CITIES_ERROR:
      return ({
        ...state,
        failed: true
      })
    case REQUEST_CITIES:
      return ({
        ...state,
        isFetching: true,
        failed: false
      })
    case RECEIVE_CITIES:
      return ({
        ...state,
        isFetching: false,
        failed: false,
        results: { [action.query]: action.data, ...state.results },
      })
    default:
      return state
  }
}

export default fetch