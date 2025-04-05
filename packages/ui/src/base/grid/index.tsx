import { cva } from "class-variance-authority";

const gridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      7: "grid-cols-7",
      8: "grid-cols-8",
      9: "grid-cols-9",
      10: "grid-cols-10",
      11: "grid-cols-11",
      12: "grid-cols-12",
    },
    autoLayout: {
      true: "auto-layout",
    },
  },
});

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  autoLayout?: boolean;
}

export function Grid({ className, cols = 1, autoLayout = false, ...props }: GridProps) {
  return <div className={gridVariants({ cols, autoLayout, className })} {...props} />;
}
