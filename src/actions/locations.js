import axios from 'axios';
import {trackPromise} from "react-promise-tracker";

import { BASE_API_URL, SET_LOCATIONS } from '../utils/constants';
import fakelocations from "../utils/fakeLocations.json";

export const initiateGetLocations = (searchedLocation) => {
  return async (dispatch) => {
    try {

        let locations;
        if(process.env.NODE_ENV === "production") {

            trackPromise(
                locations = await axios.get(
                    `${BASE_API_URL}/api/locations/find/${searchedLocation}`
                );
            );
        }
        else {
            console.log("using fake locations");
            locations = fakelocations;
        }

        console.log(locations);

        return dispatch(setLocations(locations.data));

    } catch (error) {
        // TODO
    }
  };
};

export const setLocations = (locations) => ({
  type: SET_LOCATIONS,
  locations
});
