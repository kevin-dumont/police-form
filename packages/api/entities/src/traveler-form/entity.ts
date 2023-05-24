import { DynamoDbSchema, DynamoDbTable } from "@aws/dynamodb-data-mapper";
import { TravelerFormObjectInput } from "./types";

const TravelerDbSchema = {
  firstname: { type: "String" },
  lastname: { type: "String" },
  address: { type: "String" },
  phone: { type: "String" },
  email: { type: "String" },
  dateOfBirth: { type: "String" },
  placeOfBirth: { type: "String" },
  nationality: { type: "String" },
  signature: { type: "String" },
};

export class TravelerFormObject {
  constructor(obj: TravelerFormObjectInput) {
    Object.assign(this, obj);
  }

  get [DynamoDbTable]() {
    return "traveler-form";
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
          members: TravelerDbSchema,
        },
      },
      createdTime: { type: "String" },
      updatedTime: { type: "String" },
    };
  }
}
