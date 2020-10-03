import React, { useContext } from 'react';

import LocationContext from '../context/LocationContext';

const WeatherDetails = ({location}) => {

    const {city, details, onResetDetails} = useContext(LocationContext);

    return (

        <div className="weather-details">
          <div className="back-link">
            <a href="/#" onClick={onResetDetails}>
              &lt;&lt; Compress this
            </a>
          </div>
          <div>
              <h4>{location}</h4>
          </div>
          <div className="main-section">
              {
                  details && details.map(detail => {
                      return (
                         <div key={detail.dt}>
                            <div className="weather-item">
                              <div className="date">{detail.dt_txt}</div>
                              <div className="temperature">temperature: {detail.main.temp}</div>
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
