export const addTableEnvPrefix = (tableName: string) => {
  return `${process.env.NODE_ENV}-${tableName}`;
};
