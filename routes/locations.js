const express = require('express');
const axios = require('axios');

const router = express.Router();

const OPEN_WEATHER_MAP_API = "https://community-open-weather-map.p.rapidapi.com";
const API_HOST = "community-open-weather-map.p.rapidapi.com";
const API_KEY = "2815140409msh035239f1e64035cp193608jsnbd9223223031";

const headers = {
    "x-rapidapi-host": API_HOST,
    "x-rapidapi-key": API_KEY,
    "useQueryString": true
};

router.get("/weather/:location", function(req, res, next) {

    const location = req.params.location;

    axios.get(OPEN_WEATHER_MAP_API + "/weather", {
            headers: headers,
            params: {
                q: location
            }
        })
        .then(function(response) {

            console.log(response);
            res.json(response.data);
        })
        .catch(function(error) {

            console.log(error);
        })
        .then(function() {
            // always executed
        });
});

// mock data from https://mockaroo.com
const data = require("./../data/locationData.json");

// fake API
router.get("/", function(req, res, next) {

    res.json(data);
});

router.get("/location/:id", (req, res) => {

    const locationId = req.params.id;
    if (locationId >= 50) {
        throw new Error("location not found");
    }

    res.send(data[locationId]);
});

router.post("/newLocation", (req, res) => {

    console.log(req.body);
    res.send(req.body);
});

module.exports = router;