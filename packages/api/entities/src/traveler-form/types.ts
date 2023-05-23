export type Traveler = {
  firstname: string;
  lastname: string;
  address: string;
  phone: string;
  email: string;
  dateOfBirth: Date;
  placeOfBirth: string;
  nationality: string;
  signature?: string;
};

export type TravelerForm = {
  id?: string;
  travelers: Traveler[];
  checkInDate: Date;
  checkOutDate: Date;
  createdTime?: Date;
  updatedTime?: Date;
};
