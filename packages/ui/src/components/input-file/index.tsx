import { Input, InputProps } from "@heroui/input";
import React from "react";

type InputFileProps = InputProps;

export const InputFile = React.forwardRef<HTMLInputElement, InputFileProps>(function InputFile({ ...props }, ref) {
  return <Input ref={ref} type="file" labelPlacement="outside" variant="bordered" radius="none" {...props} />;
});
