import { Input, InputProps } from "@heroui/input";
import React from "react";

interface InputTextProps
  extends Omit<
    InputProps,
    | "type"
    | "isClearable"
    | "isRequired"
    | "isReadOnly"
    | "isDisabled"
    | "isInvalid"
    | "minLength"
    | "maxLength"
    | "startContent"
    | "endContent"
    | "labelPlacement"
    | "radius"
    | "prefix"
    | "suffix"
  > {
  type?: "text" | "email" | "url" | "password" | "tel" | "search";
  clearable?: boolean;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  min?: string | number;
  max?: string | number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(function InputText(
  { type = "text", clearable, required, readonly, disabled, invalid, min, max, prefix, suffix, ...props },
  ref,
) {
  return (
    <Input
      ref={ref}
      type={type}
      isClearable={clearable}
      isRequired={required}
      isReadOnly={readonly}
      isDisabled={disabled}
      isInvalid={invalid}
      minLength={min ? Number(min) : undefined}
      maxLength={max ? Number(max) : undefined}
      startContent={prefix}
      endContent={suffix}
      labelPlacement="outside"
      radius="none"
      variant="bordered"
      {...props}
    />
  );
});
