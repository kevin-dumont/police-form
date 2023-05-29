import { apiKey, apiUri } from "../../../config/env";
import { TravelerFormInput } from "@sygmaa/entities";

export const createTravelerForm = (travelerForm: TravelerFormInput) => {
  return fetch(`${apiUri}/traveler-form`, {
    body: JSON.stringify(travelerForm),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    redirect: "follow",
  });
};
