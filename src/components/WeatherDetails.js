import React, { useContext } from 'react';

import LocationContext from '../context/LocationContext';

const WeatherDetails = () => {

    const { location, details, onResetPage } = useContext(LocationContext);

    console.log(location);
    console.log("location after useContext:");
    console.log(location);

    console.log("details after useContext:");
    console.log(details);

    const {description, temperature, wind} = details;

    return (

        <div className="job-details">
          <div className="back-link">
            <a href="/#" onClick={onResetPage}>
              &lt;&lt; Back to results
            </a>
          </div>
          <div>
            {location}
          </div>
          <div className="main-section">
            <div className="left-section">
              <div className="weather-description">
                <div className="description">{description}</div>
              </div>
            </div>
            <div className="right-section">
              <div className="temperature-details">
                <h3>About temperature</h3>
                <div className="temperature">{temperature}</div>
            </div>
            <div className="wind-details">
                <div className="wind">{wind}</div>
              </div>
            </div>
          </div>
        </div>
    );
};

export default WeatherDetails;
