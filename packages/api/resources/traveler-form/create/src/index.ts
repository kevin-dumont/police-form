import { Handler } from "aws-lambda";
import { AppLogger } from "@sygmaa/logger";
import { TravelerFormInput, validateTravelerForm } from "@sygmaa/entities";

import { saveTravelerForm } from "@sygmaa/services";

export const handler: Handler<{ body: string }> = async (event) => {
  AppLogger.info("Starting traveler-form-create", event);

  const form: TravelerFormInput = JSON.parse(event.body);

  const result = validateTravelerForm(form);

  if (!result.success) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: result.error }),
    };
  }

  try {
    await saveTravelerForm(result.data);

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Form saved successfully" }),
    };
  } catch (err) {
    AppLogger.error(err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "An error occurred while saving the form",
      }),
    };
  }
};
