import { DatePicker, DatePickerProps } from "@heroui/date-picker";
import React from "react";

interface DatepickerProps
  extends Omit<
    DatePickerProps,
    "isRequired" | "isReadOnly" | "isDisabled" | "isInvalid" | "startContent" | "endContent" | "prefix" | "suffix"
  > {
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export const Datepicker = React.forwardRef<HTMLElement, DatepickerProps>(function Datepicker(
  { required, readonly, disabled, invalid, prefix, suffix, classNames, ...props },
  ref,
) {
  return (
    <DatePicker
      ref={ref}
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
