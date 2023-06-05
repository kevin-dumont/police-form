export const calculateAge = (dateOfBirth: string) => {
  const dob = new Date(dateOfBirth);
  const differenceInMs = Date.now() - dob.getTime();
  const ageDt = new Date(differenceInMs);

  return Math.abs(ageDt.getUTCFullYear() - 1970);
};
