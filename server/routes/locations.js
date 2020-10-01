const express = require('express');
const axios = require('axios');

const router = express.Router();

const API_HOST = "community-open-weather-map.p.rapidapi.com";
const OPEN_WEATHER_MAP_API = "https://" + API_HOST;
const API_KEY = process.env.OPENWEATHER_API_KEY;

const headers = {
    "x-rapidapi-host": API_HOST,
    "x-rapidapi-key": API_KEY,
    "useQueryString": true
};

router.get("/forecast/:locationId", function(req, res, next) {

    const locationId = req.params.locationId;

    axios.get(OPEN_WEATHER_MAP_API + "/forecast", {
            headers: headers,
            params: {
                id: locationId
            }
        })
        .then(function(response) {

            console.log(response);
            const resData = {city: response.data.city, list: response.data.list};
            res.json(resData);
        })
        .catch(function(error) {

            console.log(error);
        })
        .then(function() {
            // always executed
        });
});

router.get("/find/:location", function(req, res, next) {

    const location = req.params.location;
    const KELVIN_ZERO = 273.15;
    const CELSIUS = "° C";
    const KM_H = " Km/h"

    axios.get(OPEN_WEATHER_MAP_API + "/find", {
            headers: headers,
            params: {
                q: location
            }
        })
        .then(function(response) {

            console.log(response);
            const resData = response.data.list.map(city => {

                const cityData = {
                    id: city.id,
                    name: city.name,
                    country: city.sys.country,
                    coordinates: [city.coord.lat, city.coord.lon],
                    temp: Math.round(city.main.temp - KELVIN_ZERO) + CELSIUS,
                    temp_min: Math.round(city.main.temp_min - KELVIN_ZERO) + CELSIUS,
                    temp_max: Math.round(city.main.temp_max - KELVIN_ZERO) + CELSIUS,
                    humidity: city.main.humidity,
                    wind_speed: city.wind.speed + KM_H,
                    wind_degree: city.wind.deg,
                    weather: city.weather[0].description
                };

                return cityData;
            });
            res.json(resData);
        })
        .catch(function(error) {

            console.log(error);
        })
        .then(function() {
            // always executed
        });
});

module.exports = router;
