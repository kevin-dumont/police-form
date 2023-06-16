import { v1 as uuid } from 'uuid';
import dayjs from 'dayjs';

import { getDataMapper } from '@sygmaa/core-dynamodb';
import { TravelerFormObject, TravelerFormOutput } from '@sygmaa/entities';

export async function saveTravelerForm({ ...form }: TravelerFormOutput) {
  const date = dayjs().toISOString();

  const travelerForm = {
    ...form,
    id: uuid(),
    createdTime: date,
    updatedTime: date,
  };

  return await getDataMapper().put(new TravelerFormObject(travelerForm));
}
