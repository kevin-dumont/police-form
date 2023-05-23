import { z } from "zod";
import dayjs from "dayjs";
import { TravelerForm } from "@sygmaa/entities";

const IsoDateString = z.string().refine((value) => dayjs(value).isValid(), {
  message: "Invalid ISO 8601 date string",
});

const TravelerSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string().email(),
  dateOfBirth: IsoDateString,
  placeOfBirth: z.string(),
  nationality: z.string(),
  signature: z.string().optional(),
});

export const TravelerFormSchema = z.object({
  travelers: z.array(TravelerSchema),
  checkInDate: IsoDateString,
  checkOutDate: IsoDateString,
});

export function validateTravelerForm(form: TravelerForm) {
  return TravelerFormSchema.safeParse(form);
}
