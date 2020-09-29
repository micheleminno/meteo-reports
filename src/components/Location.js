import React, { useState, useEffect } from 'react';

import {BASE_API_URL} from '../utils/constants';


function Location({data}) {

    const location = data.name;
    const latitude = data.coordinates[0];
    const longitude = data.coordinates[1];

    console.log(`lat: ${latitude}, long: ${longitude}`);

    // hook for location geocoding
    const [locationAddress, setLocationAddress] = useState("");

    useEffect(() => {
        console.log(`Fetching data for location ${location}`);

        fetch(`${BASE_API_URL}/api/google/address/${latitude}/${longitude}`)
            .then(res => res.json())
            .then(setLocationAddress)
            .catch(err => console.log(err));
    }, []);

    return ( <
        li className = "cityEntry">
        <div id = "location">
            <p> Location: {locationAddress} </p>
            <p> Weather: {data.weather} </p>
            <p> Current temp.: {data.temp} </p>
            <p> Min.temp.: {data.temp_min} </p>
            <p> Max.temp.: {data.temp_max} </p>
        <p> Wind speed: {data.wind_speed} </p>
        </div>
        </li>
    );
}

export default Location;
