var express = require('express');
var router = express.Router();

// mock data from https://mockaroo.com
const data = require("./../data/locationData.json");

router.get('/', function(req, res, next) {
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