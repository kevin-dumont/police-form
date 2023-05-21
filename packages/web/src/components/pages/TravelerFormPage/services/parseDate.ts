import moment from "moment";
import { ParsedQs } from "qs";

export const parseDate = (date?: string | ParsedQs | string[] | ParsedQs[]) => {
  if (typeof date !== "string") return undefined;

  return date ? moment(date) : undefined;
};
