import { Traveler } from "./traveler";

export type TravelerForm = {
  travelers: Traveler[];
  checkInDate: string;
  checkOutDate: string;
};
