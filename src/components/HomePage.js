import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import SearchLocation from './SearchLocation';
import WeatherDetails from './WeatherDetails';
import LocationContext from '../context/LocationContext';
import { initiateGetWeatherDetails } from '../actions/weather';


const HomePage = (props) => {

    const [results, setResults] = useState([]);
    const [locationId, setLocationId] = useState(-1);
    const [page, setPage] = useState('home');

    useEffect(() => {
        console.log("in setResults");
        console.log(props.weather);
        setResults(props.weather);
    }, [props.weather]);

    const loadWeatherDetails = (locationId) => {
        const {dispatch} = props;
        console.log(`Dispatching weather details with location id ${locationId}`);
        dispatch(
          initiateGetWeatherDetails(locationId)
        )
          .then((response) => {
              console.log("Dispached response:");
              console.log(response);
          })
          .catch();
    };

    const handleItemClick = (locationId) => {
        loadWeatherDetails(locationId);
        setPage('details');
        setLocationId(locationId);
    };

    const handleResetPage = () => {
        setPage('home');
    };

    /*
    let weatherDetails = {};
    if (page === 'details') {
        weatherDetails = results.list;
    }
    */

    const value = {
        results,
        details: results,
        onItemClick: handleItemClick,
        onResetPage: handleResetPage
    };

    console.log("value before provider");
    console.log(value);

    return (
        <LocationContext.Provider value={value}>
            <div className={`${page === 'details' && 'hide'}`}>
                <Header />
                <SearchLocation />
            </div>
            <div className={`${page === 'home' && 'hide'}`}>
                {page === 'details' && <WeatherDetails />}
            </div>
        </LocationContext.Provider>
    );
};

const mapStateToProps = (state) => ({
    weather: state.weather
});

export default connect(mapStateToProps)(HomePage);
