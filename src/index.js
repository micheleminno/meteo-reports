import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from './store/store';

import './styles/styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from "./components/HomePage";


ReactDOM.render(

    <Provider store={store}>
        <HomePage />
    </Provider>,

    document.getElementById('root')
);
