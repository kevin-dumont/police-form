import { Handler } from 'aws-lambda';
import { AppLogger } from '@sygmaa/logger';
import { TravelerFormInput, validateTravelerForm } from '@sygmaa/entities';

import { saveTravelerForm } from '@sygmaa/services';

export const handler: Handler<{ body: TravelerFormInput }> = async (event) => {
  AppLogger.info('Starting traveler-form-create', event);

  const result = validateTravelerForm(event.body);

  if (!result.success) {
    return {
      statusCode: 400,
      body: { error: result.error },
    };
  }

  try {
    const res = await saveTravelerForm(result.data);

    return {
      statusCode: 201,
      body: {
        message: 'Form saved successfully',
        data: res,
      },
    };
  } catch (err) {
    AppLogger.error(err);

    return {
      statusCode: 500,
      body: { error: 'An error occurred while saving the form' },
    };
  }
};
