export const dayToIso = (dateIso: string) => {
  return new Date(dateIso).toISOString();
};
