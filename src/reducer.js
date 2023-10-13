import * as ACTIONS from './actions'

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_CITY:
      return { ...state, city: action.value }
    case ACTIONS.SET_UNITS:
      return { ...state, units: action.value }
    case ACTIONS.SET_DATA:
      return { ...state, data: action.value }
    case ACTIONS.SET_REFRESHING:
      return { ...state, refreshing: action.value }
    case ACTIONS.SET_SPLIT_CODE:
      return { ...state, splitCode: action.value }
    case ACTIONS.SET_SHOW_SETTINGS:
      return { ...state, showSettings: action.value }
    case ACTIONS.SET_ERROR_MSG:
      return { ...state, errorMsg: action.value }
    case ACTIONS.UPDATE_SETTINGS:
      return { ...state, ...action.value }
  }
  throw Error('Unknown action: ' + action.type)
}

export default reducer
