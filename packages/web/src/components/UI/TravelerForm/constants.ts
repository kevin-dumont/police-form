import dayjs from "dayjs";
import { Traveler } from "./types";

export const travelersHas18years = (traveler: Traveler) => {
  if (!traveler?.dateOfBirth) return true;

  return traveler.dateOfBirth.isBefore(dayjs().subtract(18, "years"));
};
