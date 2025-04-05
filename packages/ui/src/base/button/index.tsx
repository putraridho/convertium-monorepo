import { Button as HeroUIButton, ButtonProps as HeroUIButtonProps } from "@heroui/button";
import React from "react";

interface ButtonProps
  extends Omit<
    HeroUIButtonProps,
    "type" | "isIconOnly" | "isDisabled" | "isLoading" | "startContent" | "endContent" | "radius" | "prefix" | "suffix"
  > {
  type?: "button" | "submit" | "reset";
  iconOnly?: boolean;
  disabled?: boolean;
  loading?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<ButtonProps>>(function Button(
  { type = "button", iconOnly, disabled, loading, prefix, suffix, color = "primary", ...props },
  ref,
) {
  return (
    <HeroUIButton
      ref={ref}
      type={type}
      isIconOnly={iconOnly}
      isDisabled={disabled}
      isLoading={loading}
      startContent={prefix}
      endContent={suffix}
      color={color}
      radius="sm"
      {...props}
    />
  );
});
