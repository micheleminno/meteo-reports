import axios from 'axios';
import {trackPromise} from "react-promise-tracker";

import { BASE_API_URL, SET_WEATHER } from '../utils/constants';
import fakeWeatherDetails from "../utils/fakeWeatherDetails.json";

export const initiateGetWeatherDetails = (locationId) => {
  return async (dispatch) => {
    try {

        if(process.env.NODE_ENV === "production") {

            trackPromise(

                    axios.get(
                        `${BASE_API_URL}/api/locations/forecast/${locationId}`
                    ).then(result => {
                        const weatherDetails = result.data;
                        return dispatch(setWeather(weatherDetails));
                    })
                    .catch(err => console.log(err))
            )
        }
        else {
            console.log("using fake weather details");
            return dispatch(setWeather(fakeWeatherDetails));
        }
    } catch (error) {
        // TODO
    }
  };
};

export const setWeather = (weather) => ({
  type: SET_WEATHER,
  weather
});
