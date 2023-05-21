import { TravelerForm, TravelerFormObject } from "@sygmaa/entities";
import { getDataMapper } from "@sygmaa/core-dynamodb";

export async function saveTravelerForm(form: TravelerForm) {
  const date = new Date();

  return await getDataMapper().put(
    new TravelerFormObject({
      ...form,
      createdTime: date,
      updatedTime: date,
    })
  );
}
