import Cookies from "js-cookie";
import { isNotClientSide, isObject } from "./assertions";

type Storage = object | string | number | bigint | boolean | undefined | null;

export const getStorage = (key: string, storageType: "localStorage" | "sessionStorage" | "cookie"): Storage => {
  if (isNotClientSide()) {
    return;
  }

  if (storageType === "cookie") {
    const item = Cookies.get(key);

    if (!item) return undefined;

    try {
      return JSON.parse(item);
    } catch (_) {
      return item;
    }
  }

  const item = window[storageType].getItem(key);

  if (!item) return undefined;

  try {
    return JSON.parse(item);
  } catch (_) {
    return item;
  }
};

export const setStorage = <T = Storage>(
  key: string,
  value: T,
  storageType: "localStorage" | "sessionStorage" | "cookie",
  expires?: number,
  domain?: string,
) => {
  if (isNotClientSide()) {
    return;
  }

  const stringValue = isObject(value) ? JSON.stringify(value) : String(value);

  if (storageType === "cookie") {
    Cookies.set(key, stringValue, {
      secure: true,
      expires,
      sameSite: "Lax",
      domain,
    });
    return;
  }

  window[storageType].setItem(key, stringValue);
};

export const removeStorage = (
  key: string,
  storageType: "localStorage" | "sessionStorage" | "cookie",
  domain?: string,
) => {
  if (isNotClientSide()) {
    return;
  }

  if (storageType === "cookie") {
    Cookies.remove(key, {
      domain,
      sameSite: "Lax",
      secure: true,
    });
    return;
  }

  window[storageType].removeItem(key);
};

export const setCookie = <T = Storage>(key: string, value: T, domain?: string) => {
  setStorage(key, value, "cookie", undefined, domain);
};

export const getCookie = (key: string): Storage | undefined => {
  return getStorage(key, "cookie");
};

export const removeCookie = (key: string, domain?: string) => {
  removeStorage(key, "cookie", domain);
};

export const setLocalStorage = <T = Storage>(key: string, value: T) => {
  setStorage(key, value, "localStorage");
};

export const getLocalStorage = (key: string): Storage | undefined => {
  return getStorage(key, "localStorage");
};

export const removeLocalStorage = (key: string) => {
  removeStorage(key, "localStorage");
};

export const setSessionStorage = <T>(key: string, value: T) => {
  setStorage(key, value, "sessionStorage");
};

export const getSessionStorage = (key: string): Storage | undefined => {
  return getStorage(key, "sessionStorage");
};

export const removeSessionStorage = (key: string) => {
  removeStorage(key, "sessionStorage");
};

export const setStorageWithExpiry = <T = Storage>(
  key: string,
  value: T,
  storageType: "localStorage" | "sessionStorage" | "cookie",
  expires?: number | null,
  domain?: string,
) => {
  if (isNotClientSide()) {
    return;
  }
  let expiresOn = expires;
  if (expiresOn === undefined || expiresOn === null) {
    expiresOn = 24 * 60 * 60;
  } else {
    expiresOn = Math.abs(expiresOn);
  }

  const now = Date.now();
  const schedule = now + expiresOn * 1000;

  setStorage(key, value, storageType, expiresOn, domain);
  setStorage(key + "_expiresIn", schedule, storageType, undefined, domain);
};
export const getStorageWithExpiry = (
  key: string,
  storageType: "localStorage" | "sessionStorage" | "cookie",
): Storage | undefined => {
  if (isNotClientSide()) {
    return;
  }

  const expiry = getStorage(key + "_expiresIn", storageType);
  const now = Date.now();
  if (Number(expiry) < now) {
    removeStorage(key + "_expiresIn", storageType);
    removeStorage(key, storageType);
    return undefined;
  }
  return getStorage(key, storageType);
};

export const removeStorageWithExpiry = (
  key: string,
  storageType: "localStorage" | "sessionStorage" | "cookie",
  domain?: string,
) => {
  if (isNotClientSide()) {
    return;
  }

  removeStorage(key, storageType, domain);
  removeStorage(key + "_expiresIn", storageType, domain);
};

export const setCookieWithExpiry = <T = Storage>(key: string, value: T, expires?: number, domain?: string) => {
  setStorageWithExpiry(key, value, "cookie", expires, domain);
};

export const getCookieWithExpiry = (key: string): Storage | undefined => {
  return getStorageWithExpiry(key, "cookie");
};

export const removeCookieWithExpiry = (key: string, domain?: string) => {
  removeStorageWithExpiry(key, "cookie", domain);
};

export const setLocalStorageWithExpiry = <T = Storage>(key: string, value: T, expires?: number) => {
  setStorageWithExpiry(key, value, "localStorage", expires);
};

export const getLocalStorageWithExpiry = (key: string): Storage | undefined => {
  return getStorageWithExpiry(key, "localStorage");
};

export const removeLocalStorageWithExpiry = (key: string) => {
  removeStorageWithExpiry(key, "localStorage");
};

export const setSessionStorageWithExpiry = <T = Storage>(key: string, value: T, expires?: number) => {
  setStorageWithExpiry(key, value, "sessionStorage", expires);
};

export const getSessionStorageWithExpiry = (key: string): Storage | undefined => {
  return getStorageWithExpiry(key, "sessionStorage");
};

export const removeSessionStorageWithExpiry = (key: string) => {
  removeStorageWithExpiry(key, "sessionStorage");
};
