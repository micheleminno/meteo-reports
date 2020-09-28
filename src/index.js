import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";

import {usePromiseTracker, trackPromise} from "react-promise-tracker";
import Loader from 'react-loader-spinner';
import {
    BASE_API_URL
} from './utils/constants';

import App from "./App";

import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoadingIndicator = props => {

    const {promiseInProgress} = usePromiseTracker();

    return (promiseInProgress &&
        <div className = "loading" >
        <Loader type = "ThreeDots"
        color = "#2BAD60"
        height = "100"
        width = "100" / >
        </div>
    );
}


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

        trackPromise(
            fetch(`${BASE_API_URL}/api/locations/find/${location}`)
            .then(res => res.json())
            .then(setLocationWeather)
            .catch(err => console.log(err))
        );

    }, [searchedLocation]);

    return (
        < >
            <div id = "search" >
                <div >
                    <input type = "text" id = "location" name = "location"
                            value = {location}
                            onChange = {e => setLocation(e.target.value)}/>
                    <button id = "searchButton"
                            onClick = {e => setSearchedLocation(location)} >
                                Search location
                    </button>
                </div >
                <div> {
                        locationWeather &&
                        <LocationList location = {searchedLocation}
                        resultData = {locationWeather}
                        />
                      }
                </div>
            </div>
        < / >
    );
}

function LocationList({location, resultData}) {

    console.log(resultData);

    return (
        <div>
            <ul> {
                resultData.map(cityResultData => {
                    return ( <Location key = {cityResultData.id}
                                    data = {cityResultData}
                    /> );
                })
            }
            </ul>
        </div >
    );
}

function Location({data}) {

    const location = data.name;
    const latitude = data.coordinates[0];
    const longitude = data.coordinates[1];

    console.log(`lat: ${latitude}, long: ${longitude}`);

    // hook for location geocoding
    const [locationAddress, setLocationAddress] = useState("");

    useEffect(() => {
        console.log(`Fetching data for location ${location}`);

        fetch(`${BASE_API_URL}/api/google/address/${latitude}/${longitude}`)
            .then(res => res.json())
            .then(setLocationAddress)
            .catch(err => console.log(err));
    }, []);

    return ( <
        li className = "cityEntry" >
        <div id = "location" >
            <p> Location: {locationAddress} </p>
            <p> Weather: {data.weather} </p>
            <p> Current temp.: {data.temp} </p>
            <p> Min.temp.: {data.temp_min} </p>
            <p> Max.temp.: {data.temp_max} </p>
        <p> Wind speed: {data.wind_speed} </p>
        </div>
        </li>
    );
}

function Home() {
    
    return (
        <>
            <h1 > Meteo reports < /h1>
            <p> See and compare weather reports across the world < /p>
            <SearchLocation / >
            <LoadingIndicator / >
        </>
    );
}

ReactDOM.render( < Home / > , document.getElementById('root'));
