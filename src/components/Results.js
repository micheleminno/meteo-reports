import React, { useState, useEffect } from 'react';
import {trackPromise} from "react-promise-tracker";

import LocationList from './LocationList';
import {BASE_API_URL} from '../utils/constants';
import fakeLocations from "../utils/fakeLocations.json";



const Results = ({ searchedLocation }) => {

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
        <div> {
                locationWeather &&
                <LocationList location = {searchedLocation}
                              resultData = {locationWeather}/>
              }
        </div>
      );
};

export default Results;
