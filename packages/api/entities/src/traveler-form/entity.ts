import { DynamoDbSchema, DynamoDbTable } from "@aws/dynamodb-data-mapper";
import { TravelerFormObjectInput } from "./types";
import { AppLogger } from "@sygmaa/logger";
import { addTableEnvPrefix } from "@sygmaa/services";

export class TravelerFormObject {
  constructor(obj: TravelerFormObjectInput) {
    Object.assign(this, obj);
  }

  get [DynamoDbTable]() {
    AppLogger.debug("table name", addTableEnvPrefix("traveler-form"));
    return addTableEnvPrefix("traveler-form");
  }

  toJson() {
    return JSON.parse(JSON.stringify(this));
  }

  get [DynamoDbSchema]() {
    return {
      id: { type: "String", keyType: "HASH" },
      checkInDate: { type: "String" },
      checkOutDate: { type: "String" },
      travelers: {
        type: "List",
        memberType: {
          type: "Document",
          members: {
            firstName: { type: "String" },
            lastName: { type: "String" },
            address: { type: "String" },
            phone: { type: "String" },
            email: { type: "String" },
            dateOfBirth: { type: "String" },
            placeOfBirth: { type: "String" },
            nationality: { type: "String" },
            signature: { type: "String" },
          },
        },
      },
      createdTime: { type: "String" },
      updatedTime: { type: "String" },
    };
  }
}
