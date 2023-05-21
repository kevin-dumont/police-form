import type { Dayjs } from "dayjs";

export type Traveler = {
  firstname: string;
  lastname: string;
  address: string;
  phone: string;
  email: string;
  dateOfBirth: Dayjs;
  placeOfBirth: string;
  nationality: string;
  signature?: string;
};

export type TravelerForm = {
  travelers: Traveler[];
  checkInDate: Dayjs;
  checkOutDate: Dayjs;
};
