import { cn } from "@convertium/utils";
import { cva } from "class-variance-authority";
import React from "react";

const stackVariants = cva("flex", {
  variants: {
    gap: {
      0: "gap-0",
      0.5: "gap-0.5",
      1: "gap-1",
      1.5: "gap-1.5",
      2: "gap-2",
      2.5: "gap-2.5",
      3: "gap-3",
      3.5: "gap-3.5",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      7: "gap-7",
      8: "gap-8",
      9: "gap-9",
      10: "gap-10",
      11: "gap-11",
      12: "gap-12",
      14: "gap-14",
      16: "gap-16",
      20: "gap-20",
      24: "gap-24",
      28: "gap-28",
      32: "gap-32",
      36: "gap-36",
      40: "gap-40",
      44: "gap-44",
      48: "gap-48",
      52: "gap-52",
      56: "gap-56",
      60: "gap-60",
      64: "gap-64",
      72: "gap-72",
      80: "gap-80",
      96: "gap-96",
    },
    wrap: {
      true: "flex-wrap",
    },
  },
});

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "main" | "header" | "footer" | "article";
  gap?:
    | 0
    | 0.5
    | 1
    | 1.5
    | 2
    | 2.5
    | 3
    | 3.5
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 14
    | 16
    | 20
    | 24
    | 28
    | 32
    | 36
    | 40
    | 44
    | 48
    | 52
    | 56
    | 60
    | 64
    | 72
    | 80
    | 96;
  wrap?: boolean;
}

export const HStack = React.forwardRef(function HStack(
  { className, as = "div", gap = 0, wrap = false, ...props }: StackProps,
  ref,
) {
  return React.createElement(as, {
    ref,
    className: stackVariants({ gap, wrap, className }),
    ...props,
  });
});

export const VStack = React.forwardRef(function VStack(
  { className, as = "div", gap = 0, wrap = false, ...props }: StackProps,
  ref,
) {
  return React.createElement(as, {
    ref,
    className: stackVariants({
      gap,
      wrap,
      className: cn("flex-col", className),
    }),
    ...props,
  });
});
