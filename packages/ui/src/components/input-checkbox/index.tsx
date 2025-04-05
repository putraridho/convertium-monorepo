import { Checkbox, CheckboxProps } from "@heroui/checkbox";
import React from "react";

interface InputCheckboxProps
  extends Omit<
    CheckboxProps,
    | "isSelected"
    | "defaultSelected"
    | "isRequired"
    | "isReadOnly"
    | "isDisabled"
    | "isIndeterminate"
    | "isInvalid"
    | "color"
    | "radius"
  > {
  selected?: boolean;
  defaultSelected?: boolean;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  indertimate?: boolean;
  invalid?: boolean;
  className?: string;
}

export const InputCheckbox = React.forwardRef<HTMLInputElement, React.PropsWithChildren<InputCheckboxProps>>(
  function InputCheckbox(
    { selected, defaultSelected, required, readonly, disabled, indertimate, invalid, ...props },
    ref,
  ) {
    return (
      <Checkbox
        ref={ref}
        isSelected={selected}
        defaultSelected={defaultSelected}
        isRequired={required}
        isReadOnly={readonly}
        isDisabled={disabled}
        isIndeterminate={indertimate}
        isInvalid={invalid}
        color="default"
        radius="none"
        {...props}
      />
    );
  },
);
