import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {trackPromise} from "react-promise-tracker";

import Location from './Location';
import {BASE_API_URL} from '../utils/constants';
import fakeLocations from "../utils/fakeLocations.json";


const Results = ({ searchedLocation }) => {

    const [locationWeather, setLocationWeather] = useState("");

    useEffect(() => {
        console.log(`Fetching data for location ${searchedLocation}`);

        if(process.env.NODE_ENV === "production") {

            trackPromise(
                axios.get(`${BASE_API_URL}/api/locations/find/${searchedLocation}`)
                    .then(result => setLocationWeather(result.data))
                    .catch(err => console.log(err))
            );
        }
        else {

            setLocationWeather(fakeLocations);
        }

    }, [searchedLocation]);


    return (
            locationWeather &&

                <div className="search-results">

                    {
                        locationWeather.map(cityResultData => {
                        return ( <Location key = {cityResultData.id}
                                           data = {cityResultData}/> );
                        })
                    }

                </div >
     );
};

export default Results;
