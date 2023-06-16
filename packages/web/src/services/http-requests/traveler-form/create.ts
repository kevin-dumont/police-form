import { apiKey, apiUri } from '../../../config/env';
import { TravelerFormInput } from '@sygmaa/entities';

export const createTravelerForm = async (travelerForm: TravelerFormInput) => {
  const response = await fetch(`${apiUri}/traveler-form`, {
    body: JSON.stringify(travelerForm),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    redirect: 'follow',
  });

  const json = await response.json();

  if (response.ok) {
    return json;
  }

  throw new Error(json);
};
