import axios from 'axios';
import { BASE_API_URL, SET_WEATHER } from '../utils/constants';
import fakeWeatherDetails from "../utils/fakeWeatherDetails.json";

export const initiateGetWeatherDetails = (locationId) => {
  return async (dispatch) => {
    try {

        let weatherDetails;
        if(process.env.NODE_ENV === "production") {
            weatherDetails = fakeWeatherDetails;
        }
        else {
            const weatherDetails = await axios.get(
                `${BASE_API_URL}/api/locations/forecast/${locationId}`
            );
        }

        return dispatch(setWeather(weatherDetails));

    } catch (error) {
        // TODO
    }
  };
};

export const setWeather = (weather) => ({
  type: SET_WEATHER,
  weather
});
