const express = require('express');
const axios = require('axios');

var config = require('../config');

const router = express.Router();

const GOOGLE_API = "https://maps.googleapis.com/maps/api/geocode/json";
const API_KEY = config.google.api_key;

router.get("/address/:latitude/:longitude", function(req, res, next) {

    const latitude = req.params.latitude.toString();
    const longitude = req.params.longitude.toString();
    const latLang = latitude + ", " + longitude;
    console.log("latLang: " + latLang);

    axios.get(GOOGLE_API, {
            params: {
                key: API_KEY,
                latlng: latLang
            }
        })
        .then(function(response) {

            console.log(response);
            const code = response.data.plus_code.compound_code;
            res.json(code.substr(code.indexOf(' ') + 1));
        })
        .catch(function(error) {

            console.log(error);
        })
        .then(function() {
            // always executed
        });
});

module.exports = router;