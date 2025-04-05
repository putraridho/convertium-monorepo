import { Avatar as HeroUIAvatar } from "@heroui/avatar";

interface AvatarProps {
  src?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | number;
  disabled?: boolean;
  showFallback?: boolean;
  className?: string;
}

export function Avatar({ src, name = "Unknown", size = "md", disabled, showFallback = true, className }: AvatarProps) {
  return (
    <HeroUIAvatar
      src={src}
      name={name}
      isDisabled={disabled}
      showFallback={showFallback}
      className={className}
      {...(typeof size === "number" ? { style: { width: size, height: size } } : { size })}
    />
  );
}
