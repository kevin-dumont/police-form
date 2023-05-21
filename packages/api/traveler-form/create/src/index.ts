import { APIGatewayProxyHandler } from "aws-lambda";

import { TravelerForm } from "@sygmaa/entities";
import { validateTravelerForm } from "@sygmaa/validators";
import { saveTravelerForm } from "@sygmaa/services";

export const handler: APIGatewayProxyHandler = async (event) => {
  const form: TravelerForm = JSON.parse(event.body);

  const result = validateTravelerForm(form);

  if (!result.success) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: result.error }),
    };
  }

  try {
    await saveTravelerForm(form);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Form saved successfully" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "An error occurred while saving the form",
      }),
    };
  }
};
