import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import weatherDetailsReducer from '../reducers/weather';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(weatherDetailsReducer,
    composeEnhancers(applyMiddleware(thunk))
);

console.log("store state:");
console.log(store.getState());

export default store;
