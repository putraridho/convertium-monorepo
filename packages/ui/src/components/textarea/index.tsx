import { Textarea as HeroUITextarea, TextAreaProps as HeroUITextareaProps } from "@heroui/input";
import React from "react";

interface TextareaProps
  extends Omit<
    HeroUITextareaProps,
    | "isClearable"
    | "isRequired"
    | "isReadOnly"
    | "isDisabled"
    | "isInvalid"
    | "startContent"
    | "endContent"
    | "labelPlacement"
    | "radius"
    | "prefix"
    | "suffix"
  > {
  clearable?: boolean;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { clearable, required, readonly, disabled, invalid, prefix, suffix, classNames, ...props },
  ref,
) {
  return (
    <HeroUITextarea
      ref={ref}
      isClearable={clearable}
      isRequired={required}
      isReadOnly={readonly}
      isDisabled={disabled}
      isInvalid={invalid}
      startContent={prefix}
      endContent={suffix}
      labelPlacement="outside"
      radius="none"
      classNames={{
        input: "placeholder:text-default-300",
        ...classNames,
      }}
      variant="bordered"
      {...props}
    />
  );
});
