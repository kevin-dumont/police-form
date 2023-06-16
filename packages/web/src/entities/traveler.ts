import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';
import { countries } from 'countries-list';

type CountryCode = keyof typeof countries;

// Single traveler schema
export const travelerSchema = z.object({
  firstName: z.string().nonempty({ message: 'First Name is required' }),
  lastName: z.string().nonempty({ message: 'Last Name is required' }),
  nationality: z.enum(Object.keys(countries) as [CountryCode, ...CountryCode[]]),
  dateOfBirth: z.string().nonempty({ message: 'Date of Birth is required' }),
  placeOfBirth: z.string().nonempty({ message: 'Place of Birth is required' }),
  fullHomeAddress: z.string().nonempty({ message: 'Full Home Address is required' }),
  phone: z.string().refine((value) => isValidPhoneNumber(value), {
    message: 'Phone number must be a valid international phone number',
  }),
  email: z.string().email({ message: 'Email must be a valid email' }),
  signature: z.string().optional(),
});

export type ITravelerShema = z.infer<typeof travelerSchema>;
