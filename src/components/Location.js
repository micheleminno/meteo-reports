import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {BASE_API_URL} from '../utils/constants';


const Location = ({data}) => {

    const location = data.name;
    const latitude = data.coordinates[0];
    const longitude = data.coordinates[1];

    console.log(`lat: ${latitude}, long: ${longitude}`);

    // hook for location geocoding
    const [locationAddress, setLocationAddress] = useState("");

    useEffect(() => {
        console.log(`Fetching data for location ${location}`);
        if(process.env.NODE_ENV === "production") {

            axios.get(`${BASE_API_URL}/api/google/address/${latitude}/${longitude}`)
                .then(result => setLocationAddress(result.data))
                .catch(err => console.log(err));
        }
        else {
            setLocationAddress("Rome, NY, USA");
        }
    }, [location, latitude, longitude]);

    return (
        <div className="location-item">
            <div className="location-name">
                {locationAddress}
            </div>
            <div className="weather-info">
                <p> {data.weather} </p>
                <p> temperature: {data.temp} (min: {data.temp_min} - max: {data.temp_max}) </p>
                <p> wind speed: {data.wind_speed} </p>
            </div>
        </div>
    );
}

export default Location;
