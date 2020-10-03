import React, { useContext } from 'react';

import Location from './Location';
import LocationContext from '../context/LocationContext';


const Results = () => {

    const {locations} = useContext(LocationContext);

    return (
            <div className="search-results">

                {
                    locations.map(cityData => {
                    return ( <Location key = {cityData.id}
                                       data = {cityData}/> );
                    })
                }

            </div >
     );
};

export default Results;
