import { DynamoDbSchema, DynamoDbTable } from "@aws/dynamodb-data-mapper";

const DateIsoString = {
  type: "Custom",
  marshall: (input: string) => ({ S: new Date(input).toISOString() }),
  unmarshall: (persistedValue: { S: string }) => new Date(persistedValue.S),
};

const TravelerSchema = {
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
  constructor(obj) {
    Object.assign(this, obj);
  }

  get [DynamoDbTable]() {
    return "traveler_form";
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
          members: TravelerSchema,
        },
      },
      createdTime: DateIsoString,
      updatedTime: DateIsoString,
    };
  }
}
