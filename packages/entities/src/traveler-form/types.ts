export type Traveler = {
  firstname: string;
  lastname: string;
  address: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  placeOfBirth: string;
  nationality: string;
  signature?: string;
};

export type TravelerForm = {
  id?: string;
  travelers: Traveler[];
  checkInDate: string;
  checkOutDate: string;
};