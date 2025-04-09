import { cn } from "@convertium/utils";
import { Spinner } from "@phosphor-icons/react/dist/ssr";
import { SVGProps } from "react";

interface LoadingProps extends SVGProps<SVGSVGElement> {
  size: "lg" | "md" | "sm" | "xs";
}

export function Loading({ size, className, ...props }: LoadingProps) {
  return <Spinner weight="bold" size={iconSize(size)} className={cn("animate-spin", className)} {...props} />;
}

export function iconSize(size: "lg" | "md" | "sm" | "xs") {
  if (size === "lg") return 24;
  if (size === "md") return 20;
  if (size === "sm") return 16;
  if (size === "xs") return 16;
  return 0;
}
