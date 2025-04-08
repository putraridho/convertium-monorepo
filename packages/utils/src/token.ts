import { CONFIG, REFRESH_TOKEN_KEY, TOKEN_KEY } from "@convertium/constants";
import { getCookie, removeCookie, setCookie } from "./storages";

export const setToken = (token: string) => {
  setCookie(
    TOKEN_KEY,
    token,
    CONFIG.HOST_URL.includes("localhost") ? "localhost" : new URL(CONFIG.HOST_URL).hostname.replace("www", ""),
  );
};

export const removeToken = () => {
  removeCookie(
    TOKEN_KEY,
    CONFIG.HOST_URL.includes("localhost") ? "localhost" : new URL(CONFIG.HOST_URL).hostname.replace("www", ""),
  );
};

export const getToken = (): string | null => {
  return getCookie(TOKEN_KEY)?.toString() || null;
};

export const setRefreshToken = (token: string) => {
  setCookie(
    REFRESH_TOKEN_KEY,
    token,
    CONFIG.HOST_URL.includes("localhost") ? "localhost" : new URL(CONFIG.HOST_URL).hostname.replace("www", ""),
  );
};

export const removeRefreshToken = () => {
  removeCookie(
    REFRESH_TOKEN_KEY,
    CONFIG.HOST_URL.includes("localhost") ? "localhost" : new URL(CONFIG.HOST_URL).hostname.replace("www", ""),
  );
};

export const getRefreshToken = (): string | null => {
  return getCookie(REFRESH_TOKEN_KEY)?.toString() || null;
};
