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
        if(process.env.NODE_ENV === "production") {

            fetch(`${BASE_API_URL}/api/google/address/${latitude}/${longitude}`)
                .then(res => res.json())
                .then(setLocationAddress)
                .catch(err => console.log(err));
        }
        else {
            setLocationAddress("Rome, NY, USA");
        }
    }, [location, latitude, longitude]);

    return (
        <div className="container, locationEntry">
          <div className="row">
            <div className="col-4">
              {locationAddress}
            </div>
            <div className="col-8">
                <p> {data.weather} </p>
                <p> Temperature: {data.temp} (min: {data.temp_min} - max: {data.temp_max}) </p>
                <p> wind speed: {data.wind_speed} </p>
            </div>
          </div>
        </div>
    );
}

export default Location;
