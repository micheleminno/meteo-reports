import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';

import LocationContext from '../context/LocationContext';

const WeatherDetails = ({location}) => {

    const {city, details, onResetDetails} = useContext(LocationContext);

    return (

        <div className="weather-details">
          <div className="back-link">
            <a href="/#" onClick={onResetDetails}>
              &lt;&lt; Hide
            </a>
          </div>
          <div>
              <h4>{location}</h4>
          </div>
          <div className="main-section">
              <Row>
              {
                  details && details.map((detail, index) => {

                      let classes = "weather-item";

                      if(!detail.light) {
                          classes += " dark";
                      }

                      return (
                             <div key={index} className={classes}>
                                 <div className="date">{detail.dt_txt}</div>
                                 <div className="temperature">{detail.main.temp}</div>
                                 <div className="description">{detail.weather[0].description}</div>
                                 <div className="wind">wind: {detail.wind.speed}</div>
                             </div>
                     );
                 })
              }
              </Row>
          </div >
        </div>
    );
};

export default WeatherDetails;
