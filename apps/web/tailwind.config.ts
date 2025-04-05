import type { Config } from "tailwindcss";
import globalConfig from "../../tailwind.config.js";

export default {
  ...globalConfig,
  theme: {
    ...globalConfig.theme,
    extend: {
      ...globalConfig.theme?.extend,
      fontFamily: {
        ...(globalConfig.theme?.extend?.fontFamily || {}),
        sans: ["var(--font-inter)"],
      },
    },
  },
} satisfies Config;
