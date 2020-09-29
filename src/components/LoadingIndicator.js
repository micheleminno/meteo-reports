import React from 'react';
import Loader from 'react-loader-spinner';

import {usePromiseTracker} from "react-promise-tracker";


function LoadingIndicator() {

    const {promiseInProgress} = usePromiseTracker();

    return (promiseInProgress &&
        <div className = "loading">
        <Loader type = "ThreeDots"
        color = "#2BAD60"
        height = "100"
        width = "100" />
        </div>
    );
}

export default LoadingIndicator;
