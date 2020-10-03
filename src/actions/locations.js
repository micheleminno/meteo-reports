import axios from 'axios';
import {trackPromise} from "react-promise-tracker";

import { BASE_API_URL, SET_LOCATIONS } from '../utils/constants';
import fakelocations from "../utils/fakeLocations.json";

export const initiateGetLocations = (searchedLocation) => {
  return async (dispatch) => {
    try {

        if(process.env.NODE_ENV === "production") {

            trackPromise(

                    axios.get(
                        `${BASE_API_URL}/api/locations/find/${searchedLocation}`
                    ).then(result => {
                        const locations = result.data;
                        return dispatch(setLocations(locations));
                    })
                    .catch(err => console.log(err))
            )
        }
        else {
            console.log("using fake locations");
            return dispatch(setLocations(fakelocations));
        }
    } catch (error) {
        // TODO
    }
  };
};

export const setLocations = (locations) => ({
  type: SET_LOCATIONS,
  locations
});
