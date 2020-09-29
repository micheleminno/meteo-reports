import React from 'react';

import Header from './Header';
import SearchLocation from './SearchLocation';
import LoadingIndicator from './LoadingIndicator';


function HomePage() {

    return (
        <div>
            <Header />
            <SearchLocation />
            <LoadingIndicator />
        </div>
    );
}

export default HomePage;
