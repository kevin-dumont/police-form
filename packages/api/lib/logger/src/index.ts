export type LogType = "error" | "warning" | "info" | "log" | "debug";

const Logger =
  (type: LogType) =>
  (...messages: any[]) => {
    const prefix = `App ${type} : `;

    console[type](prefix, ...messages);
  };

export const AppLogger = {
  error: Logger("error"),
  warning: Logger("warning"),
  info: Logger("info"),
  log: Logger("log"),
  debug: Logger("debug"),
};
