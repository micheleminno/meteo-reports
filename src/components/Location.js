import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LocationContext from '../context/LocationContext';
import {BASE_API_URL} from '../utils/constants';
import { initiateGetWeatherDetails } from '../actions/weather';
import WeatherDetails from './WeatherDetails';


const Location = (props) => {

    const id = props.data.id;
    const locationName = props.data.name;
    const latitude = props.data.coordinates[0];
    const longitude = props.data.coordinates[1];

    // hook for location geocoding
    const [locationAddress, setLocationAddress] = useState("");

    useEffect(() => {
        if(process.env.NODE_ENV === "production") {

            axios.get(`${BASE_API_URL}/api/google/address/${latitude}/${longitude}`)
                .then(result => setLocationAddress(result.data))
                .catch(err => console.log(err));
        }
        else {
            setLocationAddress("Rome, NY, USA");
        }
    }, [locationName, latitude, longitude]);


    const [results, setResults] = useState([]);
    const [locationId, setLocationId] = useState(null);

    useEffect(() => {
        setResults(props.weather);
    }, [props.weather]);

    const loadWeatherDetails = (locationId) => {
        const {dispatch} = props;
        dispatch(
            initiateGetWeatherDetails(locationId)
        )
          .then((response) => {
              console.log(response);
          })
          .catch();
    };

    const handleItemClick = (locationId) => {
        loadWeatherDetails(locationId);
        setLocationId(locationId);
    };

    const handleResetPage = () => {
        //TODO
    };

    const value = {
        city: results.city,
        details: results.list,
        onItemClick: handleItemClick,
        onResetPage: handleResetPage
    };

    return (
        <LocationContext.Provider value={value}>
            <div className="location-item" onClick={() => handleItemClick(id)}>
                <div className="location-name">
                    {locationAddress}
                </div>
                <div className="weather-info">
                    <div className="weather-description"> {props.data.weather} </div>
                    <div className="weather-temperature"> temperature: {props.data.temp}
                        (min: {props.data.temp_min} - max: {props.data.temp_max}) </div>
                    <div className="weather-wind"> wind speed: {props.data.wind_speed} </div>
                </div>
            </div>
            { locationId && <WeatherDetails/> }

        </LocationContext.Provider>
    );
}

Location.propTypes = {
  weather: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    weather: state.weather
});

export default connect(mapStateToProps)(Location);
