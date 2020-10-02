import React, { useContext } from 'react';

import LocationContext from '../context/LocationContext';

const WeatherDetails = () => {

    const {city, details, onResetPage} = useContext(LocationContext);

    return (

        <div className="job-details">
          <div className="back-link">
            <a href="/#" onClick={onResetPage}>
              &lt;&lt; Back to results
            </a>
          </div>
          <div>
            {city.name + ", " + city.country}
          </div>
          <div className="main-section">
            <div className="left-section">
              <div className="weather-description">
                <div className="description">{}</div>
              </div>
            </div>
            <div className="right-section">
              <div className="temperature-details">
                <h3>About temperature</h3>
                <div className="temperature">{}</div>
            </div>
            <div className="wind-details">
                <div className="wind">{}</div>
              </div>
            </div>
          </div>
        </div>
    );
};

export default WeatherDetails;
