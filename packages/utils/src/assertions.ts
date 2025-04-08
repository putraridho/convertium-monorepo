import { EMAIL_REGEX, URL_REGEX } from "@convertium/constants";

export const isFunction = <T extends (...args: unknown[]) => unknown = (...args: unknown[]) => unknown>(
  value: unknown,
): value is T => typeof value === "function";

export const isNotClientSide = (): boolean => typeof window === "undefined";

export const isValidDate = (date: Date): boolean => {
  return Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date.valueOf());
};

export const isEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const isBothLowerAndUppercase = (password: string): boolean => {
  return /(?=.*[a-z])(?=.*[A-Z])/.test(password);
};

export const isOneLowercase = (password: string): boolean => {
  return /(?=.*[a-z])/.test(password);
};

export const isOneNumberOrSymbol = (password: string): boolean => {
  return /(?=.*\d)|(?=.*\W)/.test(password);
};

export const isObject = (value: unknown): boolean =>
  typeof value === "object" && !Array.isArray(value) && value !== null;

export const isURL = (url: string): boolean => {
  return URL_REGEX.test(url);
};
