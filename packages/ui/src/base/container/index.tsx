import { cn } from "@convertium/utils";

type ContainerProps = React.HTMLProps<HTMLDivElement>;

export function Container({ className, ...props }: ContainerProps) {
  return <div className={cn("w-full max-w-7xl mx-auto px-4", className)} {...props} />;
}
