import { Select as HeroUISelect, SelectProps as HeroUISelectProps, SelectItem } from "@heroui/select";
import React from "react";

interface RootProps
  extends Omit<HeroUISelectProps, "isOpen" | "isRequired" | "isDisabled" | "isMultiline" | "isInvalid"> {
  open?: boolean;
  required?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  invalid?: boolean;
}

const Root = React.forwardRef<HTMLSelectElement, RootProps>(function Root(
  { open, required, disabled, multiline, invalid, classNames, ...props },
  ref,
) {
  return (
    <HeroUISelect
      ref={ref}
      isOpen={open}
      isRequired={required}
      isDisabled={disabled}
      isMultiline={multiline}
      isInvalid={invalid}
      variant="bordered"
      labelPlacement="outside"
      radius="none"
      classNames={{
        trigger: "placeholder:text-default-300",
        ...classNames,
      }}
      {...props}
    />
  );
});

const Select = {
  Root,
  Item: SelectItem,
};

export default Select;
