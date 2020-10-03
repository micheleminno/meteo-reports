import React, { useContext } from 'react';

import LocationContext from '../context/LocationContext';

const WeatherDetails = () => {

    const {city, details, onResetPage} = useContext(LocationContext);

    return (

        <div className="job-details">
          <div className="back-link">
            <a href="/#" onClick={onResetPage}>
              &lt;&lt; Compress this
            </a>
          </div>
          <div>
              <h4>{city && city.name + ", " + city.country}</h4>
          </div>
          <div className="main-section">
              {
                  details && details.map(detail => {
                      return (

                         <div>
                              <div className="left-section">
                                <div className="weather-description">
                                  <div className="description">
                                      { detail.dt_txt }
                                  </div>
                                </div>
                              </div>
                              <div className="right-section">
                                <div className="temperature-details">
                                  <div className="temperature">temperature: {detail.main.temp}</div>
                                </div>
                              </div>
                          </div>
                      );
                  })
              }

          </div >
        </div>
    );
};

export default WeatherDetails;
