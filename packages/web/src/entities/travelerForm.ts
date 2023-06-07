import { z } from "zod";
import { ITravelerShema, travelerSchema } from "./traveler";
import { calculateAge } from "../services/numbers/calculateAge";

// Validation function
const hasAtLeastOneAdult = (travelers: ITravelerShema[]) => {
  return travelers.some((traveler) => calculateAge(traveler.dateOfBirth) >= 18);
};

export const travelerFormSchema = z.object({
  travelers: z.array(travelerSchema).refine(hasAtLeastOneAdult, {
    message: "At least one adult must be present",
  }),
});

export type ITavelerFormSchema = z.infer<typeof travelerFormSchema>;
