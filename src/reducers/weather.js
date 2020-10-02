import { SET_WEATHER } from '../utils/constants';

const initialState = {
    details: [],
    error: null
}

const weatherDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WEATHER:
      return {
          ...state,
          details: action.weather
      }
    default:
      return state;
  }
};

export default weatherDetailsReducer;
