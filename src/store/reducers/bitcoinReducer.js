const INITIAL_STATE = {
  dataToShow: null,
}
export function bitcoinReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        dataToShow: action.data
      }
    default:
      return state
  }
}