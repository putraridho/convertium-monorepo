import { CONFIG, REFRESH_TOKEN_KEY, TOKEN_KEY } from "@convertium/constants";
import { getCookieWithExpiry, removeCookieWithExpiry, setCookieWithExpiry } from "./storages";

export const setToken = (token: string, expires?: number) => {
  setCookieWithExpiry(
    TOKEN_KEY,
    token,
    expires,
    CONFIG.HOST_URL.includes("localhost") ? "localhost" : new URL(CONFIG.HOST_URL).hostname.replace("www", ""),
  );
};

export const removeToken = () => {
  removeCookieWithExpiry(
    TOKEN_KEY,
    CONFIG.HOST_URL.includes("localhost") ? "localhost" : new URL(CONFIG.HOST_URL).hostname.replace("www", ""),
  );
};

export const getToken = (): string | null => {
  return getCookieWithExpiry(TOKEN_KEY)?.toString() || null;
};

export const setRefreshToken = (token: string, expires?: number) => {
  setCookieWithExpiry(
    REFRESH_TOKEN_KEY,
    token,
    expires,
    CONFIG.HOST_URL.includes("localhost") ? "localhost" : new URL(CONFIG.HOST_URL).hostname.replace("www", ""),
  );
};

export const removeRefreshToken = () => {
  removeCookieWithExpiry(
    REFRESH_TOKEN_KEY,
    CONFIG.HOST_URL.includes("localhost") ? "localhost" : new URL(CONFIG.HOST_URL).hostname.replace("www", ""),
  );
};

export const getRefreshToken = (): string | null => {
  return getCookieWithExpiry(REFRESH_TOKEN_KEY)?.toString() || null;
};
