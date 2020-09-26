import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./App";

import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchLocation() {

    // hook for location
    const [location, setLocation] = useState("");

    useEffect(() => {
        console.log(`You typed ${location}`);
    }, [location]);

    // hook for searched location
    const [searchedLocation, setSearchedLocation] = useState("");

    useEffect(() => {
        console.log(`You searched ${searchedLocation}`);
    }, [searchedLocation]);

    // hook for location result weather
    const [locationWeather, setLocationWeather] = useState("");
    useEffect(() => {
        console.log(`Fetching data for location ${location}`);
        fetch(`/api/locations/weather/${location}`)
            .then(res => res.json())
            .then(setLocationWeather)
            .catch(err => console.log(err));
    }, [searchedLocation]);

    return (
        <>
            <div id="search">
                <div>
                    <input type="text" id="location" name="location"
                            value={location} onChange={e => setLocation(e.target.value)}/>
                        <button id="searchButton" onClick={e => setSearchedLocation(location)} >Search location</button>
                </div>
                <div>
                    { locationWeather && <Location location = {searchedLocation} result={locationWeather} />}
                </div>
            </div>
    </>);
}

function Location({location, result}) {

    console.log(result);

    return ( <div>
                <h2> {location} </h2>
                <h4> visibility {result.visibility} </h4>

            </div>
    );
}

function Home() {

    return(
     <>
        <h1> Meteo reports </h1>
        <p> See and compare weather reports across the world </p>
        <SearchLocation />
     </>
 );
}

ReactDOM.render(<Home />, document.getElementById('root'));
