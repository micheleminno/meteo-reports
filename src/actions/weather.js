import axios from 'axios';
import {trackPromise} from "react-promise-tracker";

import { BASE_API_URL, SET_WEATHER } from '../utils/constants';
import fakeWeatherDetails from "../utils/fakeWeatherDetails.json";

export const initiateGetWeatherDetails = (locationId) => {
  return async (dispatch) => {
    try {

        let weatherDetails;
        if(process.env.NODE_ENV === "production") {
            trackPromise(
                const weatherDetails = await axios.get(
                    `${BASE_API_URL}/api/locations/forecast/${locationId}`
                );
            );
        }
        else {
            weatherDetails = fakeWeatherDetails;
        }

        return dispatch(setWeather(weatherDetails.data));

    } catch (error) {
        // TODO
    }
  };
};

export const setWeather = (weather) => ({
  type: SET_WEATHER,
  weather
});
