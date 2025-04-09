import { cn } from "@convertium/utils";
import Link from "next/link";

interface NavItemProps {
  href: string;
  active?: boolean;
}

export function NavItem({ href, active, children }: React.PropsWithChildren<NavItemProps>) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "flex items-center gap-4 py-1 px-2 md:py-2 md:px-4 rounded-lg text-xs md:text-sm transition-all",
          active ? "bg-primary text-primary-foreground font-medium" : "hover:bg-default-200 hover:text-default-700",
        )}
      >
        {children}
      </Link>
    </li>
  );
}
