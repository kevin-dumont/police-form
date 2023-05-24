import { TravelerFormOutput } from "./schema";

export type NonEditableFields = {
  id: string;
  createdTime: string;
  updatedTime: string;
};

export type TravelerFormObjectInput = TravelerFormOutput & NonEditableFields;
