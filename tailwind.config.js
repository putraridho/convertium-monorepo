/* eslint-disable @typescript-eslint/no-require-imports */
const { heroui } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-mode="dark"]'],
  content: [
    "./apps/**/*.{js,ts,jsx,tsx,mdx}",
    "./packages/**/*.{js,ts,jsx,tsx,mdx}",

    // Note: Since this configuration will be imported in the application,
    // we need to include this package's relative path from the app's root path.
    "./**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",

    // Must pointing to the root node_modules
    // Ref: https://heroui.org/docs/guide/installation#tailwind-css-setup
    "../../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        huge: ["4rem", "4.75rem"],
        "huge-mobile": ["3.25rem", "3.5rem"],
        h1: ["2.5rem", "3.25rem"],
        "h1-mobile": ["2rem", "3.25rem"],
        h2: ["2rem", "2.5rem"],
        "h2-mobile": ["1.5rem", "2.5rem"],
        h3: ["1.5rem", "2rem"],
        "h3-mobile": ["1.25rem", "2rem"],
        h4: ["1.375rem", "1.75rem"],
        "h4-mobile": ["1.125rem", "1.75rem"],
        large: ["1.125rem", "1.75rem"],
        medium: ["1rem", "1.5rem"],
        small: ["0.875rem", "1.25rem"],
        "xtra-small": ["0.75rem", "1.25rem"],
        micro: ["0.5rem", "0.5rem"],
      },
      keyframes: {
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
      },
      animation: {
        enter: "enter 300ms ease-out",
        leave: "leave 300ms ease-in forwards",
      },
    },
  },
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              foreground: "#ffffff",
              DEFAULT: "#E34234",
            },
          },
        },
        dark: {
          colors: {
            primary: {
              foreground: "#ffffff",
              DEFAULT: "#E34234",
            },
          },
        },
      },
    }),
  ],
};
