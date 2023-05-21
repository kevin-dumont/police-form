import moment from "moment";

export type FormTraveler = {
  firstname: string;
  lastname: string;
  address: string;
  phone: string;
  email: string;
  dateOfBirth: moment.Moment;
  placeOfBirth: string;
  nationality: string;
  signature?: string;
};

export type TravelerFormData = {
  travelers: FormTraveler[];
  checkInDate: moment.Moment;
  checkOutDate: moment.Moment;
};
