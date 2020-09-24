const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");

const app = express();

// mock data from https://mockaroo.com
const data = require("./data/data.json");

const PORT = 3000;

app.use(express.static("public"));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use(express.json());

app.get("/", (req, res) => {

    res.json(data);
});

app.get("/location/:id", (req, res) => {

    const locationId = req.params.id;
    if (locationId >= 50) {
        throw new Error("location not found");
    }

    res.send(data[locationId]);
});

app.post("/newLocation", (req, res) => {

    console.log(req.body);
    res.send(req.body);
});

app.use((err, req, res, next) => {

    console.error(err.stack);
    res.status(500).send(`An error has occurred! ${err.stack}`);
});

app.listen(PORT, () => {

    console.log(`Your server is running on port ${PORT}`);
});