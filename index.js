const express = require("express");
const app = express();

// mock data from https://mockaroo.com
const data = require("./data/data.json");

const PORT = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {

    res.json(data);
});

app.listen(PORT, () => {

    console.log(`Your server is running on port ${PORT}`);
});