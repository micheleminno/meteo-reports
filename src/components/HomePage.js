import React from 'react';

import SearchLocation from './SearchLocation';
import LoadingIndicator from './LoadingIndicator';


function HomePage() {

    return (
        <>
            <h1> Meteo reports </h1>
            <p> See and compare weather reports across the world </p>
            <SearchLocation />
            <LoadingIndicator />
        </>
    );
}

export default HomePage;
