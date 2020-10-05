const express = require('express');
const axios = require('axios');
const {groupBy} = require('lodash');
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
    return Math.floor(3.6 * ms) + KM_H;
};

router.get("/forecast/:locationId", function(req, res, next) {

    const locationId = req.params.locationId;

    const toHour = millies => {
        return Math.floor((millies/60/60) % 24);
    };

    axios.get(OPEN_WEATHER_MAP_API + "/forecast", {
            headers: headers,
            params: {
                id: locationId
            }
        })
        .then(function(response) {

            const sunriseHour = toHour(response.data.city.sunrise);
            const sunsetHour = toHour(response.data.city.sunset);

            const groupedDetails = groupBy(response.data.list, detail => detail.dt_txt.slice(0, -9));

            const labeledGroupedDetails = Object.keys(groupedDetails)
                                            .map((day, dayIndex) => {

                return groupedDetails[day].map((detail) => {

                    detail.main.temp = toCelsius(detail.main.temp);
                    detail.main.temp_min = toCelsius(detail.main.temp_min);
                    detail.main.temp_max = toCelsius(detail.main.temp_max);
                    detail.main.feels_like = toCelsius(detail.main.feels_like);

                    detail.wind.speed = toKmH(detail.wind.speed);
                    const currentHour = detail.dt_txt.slice(-8, -6);
                    detail.light = currentHour >= sunriseHour && currentHour <= sunsetHour;

                    detail.dt_txt = detail.dt_txt.slice(0, -3);
                    detail.day = "day-" + dayIndex;

                    return detail;
                });
            });

            const flattenedDetails = labeledGroupedDetails.flat();

            const resData = {city: response.data.city, list: flattenedDetails};
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

    const KM_H = " Km/h";

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
