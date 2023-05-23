import { TravelerForm, TravelerFormObject } from "@sygmaa/entities";
import { getDataMapper } from "@sygmaa/core-dynamodb";

import { v1 as uuid } from "uuid";

export async function saveTravelerForm(form: TravelerForm) {
  const date = new Date();

  return await getDataMapper().put(
    new TravelerFormObject({
      ...form,
      id: uuid(),
      createdTime: date,
      updatedTime: date,
    })
  );
}
