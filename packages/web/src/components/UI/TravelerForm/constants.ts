import moment from "moment";
import { FormTraveler } from "./types";

export const travelersHas18years = (traveler: FormTraveler) => {
  if (!traveler?.dateOfBirth) return true;

  return traveler.dateOfBirth.isBefore(moment().subtract(18, "years"));
};
