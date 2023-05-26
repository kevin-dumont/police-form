import axios from "axios";
import { apiKey, apiUri } from "../../../config/env";
import { TravelerFormInput } from "@sygmaa/entities";

export const createTravelerForm = (travelerForm: TravelerFormInput) => {
  return axios.post(`${apiUri}/traveler-form`, travelerForm, {
    responseType: "json",
    headers: {
      "Content-Type": "json",
      "x-api-key": apiKey,
    },
  });
};
