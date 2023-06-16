import { format } from 'date-fns';

export const isoToDay = (date: string) => {
  return format(new Date(date), 'yyyy-MM-dd');
};
