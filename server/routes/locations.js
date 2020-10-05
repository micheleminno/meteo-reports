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

const toCelsius = kelvinDegrees => {

    const KELVIN_ZERO = 273.15;
    const CELSIUS = "° C";
    const celsiusDegrees = Math.round(kelvinDegrees - KELVIN_ZERO) + CELSIUS;
    return celsiusDegrees;
};

const toKmH = ms => {

    const KM_H = " km/h";
    return 3.6 * ms + KM_H;
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
            response.data.list.map(weatherItem => {

                weatherItem.main.temp = toCelsius(weatherItem.main.temp);
                weatherItem.main.temp_min = toCelsius(weatherItem.main.temp_min);
                weatherItem.main.temp_max = toCelsius(weatherItem.main.temp_max);
                weatherItem.main.feels_like = toCelsius(weatherItem.main.feels_like);
                weatherItem.dt_txt = weatherItem.dt_txt.slice(0, -3); ;

                return weatherItem;
            });

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
                    temp: toCelsius(city.main.temp),
                    temp_min: toCelsius(city.main.temp_min),
                    temp_max: toCelsius(city.main.temp_max),
                    humidity: city.main.humidity,
                    wind_speed: toKmH(city.wind.speed),
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
