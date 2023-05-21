import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";
import { parseDate } from "../services/parseDate";
import { parseNumber } from "../services/parseNumber";

export const useQueryInfos = () => {
  const location = useLocation();

  const parsedQuery = useMemo(
    () => qs.parse(location.search.substr(1)),
    [location]
  );

  const result = useMemo(
    () => ({
      checkInDate: parseDate(parsedQuery?.checkInDate),
      checkOutDate: parseDate(parsedQuery?.checkOutDate),
      nbTravelers: parseNumber(parsedQuery?.nbTravelers) ?? 1,
    }),
    [parsedQuery]
  );

  return result;
};
