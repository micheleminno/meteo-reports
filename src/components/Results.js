import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import {usePromiseTracker, trackPromise} from "react-promise-tracker";

import LocationList from './LocationList';
import {BASE_API_URL} from '../utils/constants';
import fakeLocations from "../utils/fakeLocations.json";


const Results = ({ searchedLocation }) => {

    const {promiseInProgress} = usePromiseTracker();
    const [locationWeather, setLocationWeather] = useState("");

    useEffect(() => {
        console.log(`Fetching data for location ${searchedLocation}`);

        if(process.env.NODE_ENV === "production") {

            trackPromise(
                fetch(`${BASE_API_URL}/api/locations/find/${searchedLocation}`)
                .then(res => res.json())
                .then(setLocationWeather)
                .catch(err => console.log(err))
            );
        }
        else {

            setLocationWeather(fakeLocations);
        }

    }, [searchedLocation]);


    return (
        <>
            <div className = "loading">
                {promiseInProgress && <Loader type = "ThreeDots" color = "#2BAD60"
                        height = "100" width = "100" />}
            </div>
            <div> {
                    locationWeather &&
                    <LocationList location = {searchedLocation}
                                  resultData = {locationWeather}/>
                  }
            </div>
        </>
      );
};

export default Results;
