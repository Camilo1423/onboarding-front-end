import { Config } from "@Constant";

export const consoleLog = (...args) => {
  if (!Config.isProd) {
    console.log(...args);
  }
};

export const consoleError = (...args) => {
  if (!Config.isProd) {
    console.error(...args);
  }
};

export const consoleWarn = (...args) => {
  if (!Config.isProd) {
    console.warn(...args);
  }
};

export const consoleDebug = (...args) => {
  if (!Config.isProd) {
    console.debug(...args);
  }
};

export const consoleTable = (...args) => {
  if (!Config.isProd) {
    console.table(...args);
  }
};
