import { DynamoDbSchema, DynamoDbTable } from "@aws/dynamodb-data-mapper";
import { TravelerFormOutput } from "./schema";
import { TravelerFormObjectInput } from "./types";

const DateIsoString = {
  type: "Custom",
  marshall: (input: string) => ({ S: new Date(input).toISOString() }),
  unmarshall: (persistedValue: { S: string }) => new Date(persistedValue.S),
};

const TravelerDbSchema = {
  firstname: { type: "String" },
  lastname: { type: "String" },
  address: { type: "String" },
  phone: { type: "String" },
  email: { type: "String" },
  dateOfBirth: DateIsoString,
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
      checkInDate: DateIsoString,
      checkOutDate: DateIsoString,
      travelers: {
        type: "List",
        memberType: {
          type: "Document",
          members: TravelerDbSchema,
        },
      },
      createdTime: DateIsoString,
      updatedTime: DateIsoString,
    };
  }
}
