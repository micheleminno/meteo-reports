import React, { useState, useEffect } from 'react';
import {trackPromise} from "react-promise-tracker";

import LocationList from './LocationList';
import {BASE_API_URL} from '../utils/constants';


function SearchLocation() {

    const [location, setLocation] = useState("");

    useEffect(() => {
        console.log(`You typed ${location}`);
    }, [location]);

    const [searchedLocation, setSearchedLocation] = useState("");

    useEffect(() => {
        console.log(`You searched ${searchedLocation}`);
    }, [searchedLocation]);

    const [locationWeather, setLocationWeather] = useState("");
    useEffect(() => {
        console.log(`Fetching data for location ${location}`);

        trackPromise(
            fetch(`${BASE_API_URL}/api/locations/find/${location}`)
            .then(res => res.json())
            .then(setLocationWeather)
            .catch(err => console.log(err))
        );

    }, [searchedLocation]);

    return (
        <>
            <div id = "search">
                <div>
                    <input type = "text" id = "location" name = "location"
                            value = {location}
                            onChange = {e => setLocation(e.target.value)}/>
                    <button id = "searchButton"
                            onClick = {e => setSearchedLocation(location)}>
                                Search location
                    </button>
                </div>
                <div> {
                        locationWeather &&
                        <LocationList location = {searchedLocation}
                                      resultData = {locationWeather}/>
                      }
                </div>
            </div>
        </>
    );
}

export default SearchLocation;
