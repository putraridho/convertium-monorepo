import { cva } from "class-variance-authority";
import React from "react";

const typographyVariants = cva(null, {
  variants: {
    weight: {
      100: "font-thin",
      200: "font-extralight",
      300: "font-light",
      400: "font-normal",
      500: "font-medium",
      600: "font-semibold",
      700: "font-bold",
      800: "font-extrabold",
      900: "font-black",
      thin: "font-thin",
      extralight: "font-extralight",
      light: "font-light",
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
      black: "font-black",
    },
    size: {
      huge: "text-huge-mobile lg:text-huge",
      h1: "text-h1-mobile lg:text-h1",
      h2: "text-h2-mobile lg:text-h2",
      h3: "text-h3-mobile lg:text-h3",
      h4: "text-h4-mobile lg:text-h4",
      lg: "text-large",
      md: "text-medium",
      sm: "text-small",
      xs: "text-xtra-small",
      link: "text-black font-semibold decoration-inherit data-[hover]:decoration-inherit hover:underline cursor-pointer",
      micro: "text-micro",
    },
    truncate: {
      true: "truncate text-ellipsis",
    },
  },
});

type TypographyType = HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement;

export interface TypographyProps extends React.HTMLAttributes<TypographyType> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  weight?:
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900
    | "thin"
    | "extralight"
    | "light"
    | "regular"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black";
  size?: "huge" | "h1" | "h2" | "h3" | "h4" | "lg" | "md" | "sm" | "xs" | "link" | "micro";
  truncate?: boolean;
}

export const Typography = React.forwardRef<TypographyType, TypographyProps>(function Typography(
  { as = "p", weight = 400, size = "md", truncate = false, className, children, ...props },
  ref,
) {
  return React.createElement(
    as ?? "p",
    {
      ref,
      className: typographyVariants({ weight, size, truncate, className }),
      ...props,
    },
    children,
  );
});
