import type { TravelerForm as ApiTravelerForm } from "@sygmaa/entities";
import type { TravelerForm as WebTravelerForm } from "../../components/UI/TravelerForm/types";
import dayjs from "dayjs";

export const buildTravelerFormOutput = ({
  checkInDate,
  checkOutDate,
  travelers,
}: WebTravelerForm): ApiTravelerForm => {
  return {
    checkInDate: checkInDate.startOf("day").toDate(),
    checkOutDate: checkOutDate.startOf("day").toDate(),
    travelers: travelers.map(({ dateOfBirth, ...restTraveler }) => ({
      ...restTraveler,
      dateOfBirth: dateOfBirth.startOf("day").toDate(),
    })),
  };
};

export const buildTravelerFormInput = ({
  checkInDate,
  checkOutDate,
  travelers,
}: ApiTravelerForm): WebTravelerForm => {
  return {
    checkInDate: dayjs(checkInDate),
    checkOutDate: dayjs(checkOutDate),
    travelers: travelers.map(({ dateOfBirth, ...restTraveler }) => ({
      ...restTraveler,
      dateOfBirth: dayjs(dateOfBirth),
    })),
  };
};
