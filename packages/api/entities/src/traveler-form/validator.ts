import { TravelerFormInput, travelerFormSchema } from "./schema";

export function validateTravelerForm(form: TravelerFormInput) {
  return travelerFormSchema.safeParse(form);
}
