import { TravelerFormObject, TravelerFormOutput } from "@sygmaa/entities";
import { getDataMapper } from "@sygmaa/core-dynamodb";

import { v1 as uuid } from "uuid";
import { AppLogger } from "@sygmaa/logger";

export async function saveTravelerForm({ ...form }: TravelerFormOutput) {
  const date = new Date();

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
