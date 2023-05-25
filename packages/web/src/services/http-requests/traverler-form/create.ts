import axios from "axios";
import { apiKey, apiUri } from "../../../config/env";
import { TravelerFormInput } from "@sygmaa/entities";

export const createTravelerForm = (travelerForm: TravelerFormInput) => {
  return axios.post(`${apiUri}/traveler-form`, travelerForm, {
    headers: {
      "x-api-key": apiKey,
    },
  });
};
