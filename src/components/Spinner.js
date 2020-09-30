import React from 'react';
import Loader from 'react-loader-spinner';
import {usePromiseTracker} from "react-promise-tracker";


const Spinner = () => {

  const { promiseInProgress } = usePromiseTracker({delay: 200});

    return (
        promiseInProgress &&
            <div className = "spinner">
                <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
            </div>
    );
}

export default Spinner;
