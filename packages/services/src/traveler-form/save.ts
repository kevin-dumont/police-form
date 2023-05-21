import { TravelerForm } from "@sygmaa/entities";
import { getDataMapper } from "@sygmaa/core-dynamodb";

export async function saveTravelerForm(form: TravelerForm) {
  return await getDataMapper().put({ item: form });
}
