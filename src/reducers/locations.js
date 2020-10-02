import { SET_LOCATIONS } from '../utils/constants';

const locationsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_LOCATIONS:
      return action.locations;
    default:
      return state;
  }
};

export default locationsReducer;
