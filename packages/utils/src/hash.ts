import { CONFIG } from "@convertium/constants";

export function hash(plainText: string): string {
  const salt = CONFIG.SALT;
  let hash = 0;

  for (let i = 0; i < plainText.length; i++) {
    hash = (hash << 5) - hash + plainText.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return (hash + salt).toString();
}
