import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
        setPage('details');
        setLocationId(locationId);
    };

    const handleResetPage = () => {
        setPage('home');
    };

    let weatherDetails = {};
    if (page === 'details') {
        weatherDetails = results.list;
    }

    const value = {
        city: results.city,
        details: results.list,
        onItemClick: handleItemClick,
        onResetPage: handleResetPage
    };

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

HomePage.propTypes = {
  weather: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    weather: state.weather
});

export default connect(mapStateToProps)(HomePage);
