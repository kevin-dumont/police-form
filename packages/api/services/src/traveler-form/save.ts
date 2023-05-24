import { v1 as uuid } from "uuid";
import dayjs from "dayjs";

import { getDataMapper } from "@sygmaa/core-dynamodb";
import { TravelerFormObject, TravelerFormOutput } from "@sygmaa/entities";
import { AppLogger } from "@sygmaa/logger";

export async function saveTravelerForm({ ...form }: TravelerFormOutput) {
  const date = dayjs().toISOString();

  AppLogger.log("Saving", {
    ...form,
    id: uuid(),
    createdTime: date,
    updatedTime: date,
  });

  return await getDataMapper().put(
    new TravelerFormObject({
      ...form,
      id: uuid(),
      createdTime: date,
      updatedTime: date,
    })
  );
}
