import { SET_WEATHER } from '../utils/constants';

const weatherDetailsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_WEATHER:
      return action.weather;
    default:
      return state;
  }
};

export default weatherDetailsReducer;
