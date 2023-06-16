import type { TravelerFormInput as ApiTravelerForm } from '@sygmaa/entities';
import { IFormSchema } from '../../entities/form';
import { ITravelerShema } from '../../entities/traveler';
import { dayToIso } from '../dates/day-to-iso';
import { isoToDay } from '../dates/iso-to-day';

export const buildTravelerFormOutput = ({ travelers, checkInDate, checkOutDate }: IFormSchema): ApiTravelerForm => {
  return {
    checkInDate: dayToIso(checkInDate),
    checkOutDate: dayToIso(checkOutDate),
    travelers: travelers.map(
      ({ fullHomeAddress, dateOfBirth, email, firstName, lastName, nationality, phone, placeOfBirth, signature }) => ({
        firstName,
        lastName,
        nationality: nationality as string,
        address: fullHomeAddress,
        dateOfBirth: dayToIso(dateOfBirth),
        email,
        phone,
        placeOfBirth,
        signature,
      }),
    ),
  };
};

export const buildTravelerFormInput = ({ travelers, checkInDate, checkOutDate }: ApiTravelerForm): IFormSchema => {
  return {
    checkInDate: isoToDay(checkInDate),
    checkOutDate: isoToDay(checkOutDate),
    travelers: travelers.map(({ nationality, address, dateOfBirth, ...restTraveler }) => ({
      ...restTraveler,
      fullHomeAddress: address,
      nationality: nationality as ITravelerShema['nationality'],
      dateOfBirth: isoToDay(dateOfBirth),
    })),
  };
};
