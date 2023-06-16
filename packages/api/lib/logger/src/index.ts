export type LogType = "error" | "warn" | "info" | "log" | "debug";

/**
 * An abstraction of console.[type] in case of a future
 * migration to a log service like Sentry or other
 */
const Logger =
  (type: LogType) =>
  (...messages: any[]) => {
    console[type](...messages);
  };

export const AppLogger = {
  error: Logger("error"),
  warn: Logger("warn"),
  info: Logger("info"),
  log: Logger("log"),
  debug: Logger("debug"),
};
