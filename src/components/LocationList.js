import React from 'react';

import Location from './Location';

function LocationList({location, resultData}) {

    console.log(resultData);

    return (
        <div>
            {
                resultData.map(cityResultData => {
                    return ( <Location key = {cityResultData.id}
                                       data = {cityResultData}/> );
                })
            }
        </div >
    );
}

export default LocationList;