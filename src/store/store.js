import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import weatherDetailsReducer from '../reducers/weather';
import locationsReducer from '../reducers/locations';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers({
    locations: locationsReducer,
    weather: weatherDetailsReducer
  }),
    composeEnhancers(applyMiddleware(thunk))
);

console.log(store.getState());

export default store;
