import type { TravelerFormInput as ApiTravelerForm } from "@sygmaa/entities";
import { IFormSchema } from "../../entities/form";
import { ITravelerShema } from "../../entities/traveler";

export const buildTravelerFormOutput = ({
  travelers,
  ...payload
}: IFormSchema): ApiTravelerForm => {
  return {
    ...payload,
    travelers: travelers.map(
      ({
        fullHomeAddress,
        dateOfBirth,
        email,
        firstName,
        lastName,
        nationality,
        phone,
        placeOfBirth,
        signature,
      }) => ({
        firstName,
        lastName,
        nationality: nationality as string,
        address: fullHomeAddress,
        dateOfBirth,
        email,
        phone,
        placeOfBirth,
        signature,
      })
    ),
  };
};

export const buildTravelerFormInput = ({
  travelers,
  ...payload
}: ApiTravelerForm): IFormSchema => {
  return {
    ...payload,
    travelers: travelers.map(({ nationality, address, ...restTraveler }) => ({
      ...restTraveler,
      fullHomeAddress: address,
      nationality: nationality as ITravelerShema["nationality"],
    })),
  };
};
