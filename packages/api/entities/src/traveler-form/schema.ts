import { z } from "zod";

const datetime = z.string().datetime();

const travelerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string().email(),
  dateOfBirth: datetime,
  placeOfBirth: z.string(),
  nationality: z.string(),
  signature: z.string().optional(),
});

export const travelerFormSchema = z.object({
  travelers: z.array(travelerSchema),
  checkInDate: datetime,
  checkOutDate: datetime,
});

export type TravelerFormInput = z.input<typeof travelerFormSchema>;

export type TravelerFormOutput = z.infer<typeof travelerFormSchema>;
