import moment from "moment";
import { ParsedQs } from "qs";

export const parseNumber = (
  number?: string | ParsedQs | string[] | ParsedQs[]
) => {
  if (typeof number !== "string") return undefined;

  return number ? Number.parseInt(number) : undefined;
};
