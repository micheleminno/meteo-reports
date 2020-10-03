# meteo-reports
Comparative weather forecasts from personalized list of cities.

## Live demo
The app is deployed [here](https://meteo-reports.herokuapp.com/).

## APIs
The API server is [here](https://meteo-reports.herokuapp.com/api/).

It internally calls data from:
- [Open Weather APIs](https://rapidapi.com/community/api/open-weather-map)
- [Google Maps Geocoding APIs](https://developers.google.com/maps/documentation/geocoding/)

## Install and run locally
- npm run build: it will build the client and install the server
- npm start: it will start the server

## Run only the client with fake data
- npm run start-client: it will start the client with no server
