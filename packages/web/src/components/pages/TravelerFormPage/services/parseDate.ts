import { ParsedQs } from "qs";
import dayjs from "dayjs";

export const parseDate = (date?: string | ParsedQs | string[] | ParsedQs[]) => {
  if (typeof date !== "string") return undefined;

  return date ? dayjs(date) : undefined;
};
