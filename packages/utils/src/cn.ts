import { cn as heroUiCn } from "@heroui/theme";
import { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return heroUiCn(inputs);
}
