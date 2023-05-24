import { TravelerFormOutput } from "./schema";

export type NonEditableFields = {
  id: string;
  createdTime: Date;
  updatedTime: Date;
};

export type TravelerFormObjectInput = TravelerFormOutput & NonEditableFields;
