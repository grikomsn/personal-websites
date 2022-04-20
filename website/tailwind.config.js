const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import("tailwindcss/plugin").TailwindPluginCreator} */
const plugin = require("tailwindcss/plugin");

/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
const tailwindConfig = {
  content: ["{hooks,lib,pages,store,ui,utils}/**/*.{js,cjs,mjs,ts,tsx}"],
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    plugin(({ addVariant }) => {
      addVariant("children", "& > *");
    }),
  ],
  presets: [require("@project/tailwind-animations")],
  theme: {
    extend: {
      colors: {
        body: colors.neutral[900],
        primary: colors.yellow[500],
        "primary-focus": colors.yellow[600],
        text: colors.neutral[300],
      },
      fontFamily: {
        mono: ['"Berkeley Mono"', ...defaultTheme.fontFamily.mono],
        sans: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        "2xs": ["0.75rem", { lineHeight: "1rem" }],
        xs: ["0.875rem", { lineHeight: "1.25rem" }],
        sm: ["1rem", { lineHeight: "1.5rem" }],
        base: ["1.125rem", { lineHeight: "1.75rem" }],
        lg: ["1.25rem", { lineHeight: "1.75rem" }],
        xl: ["1.5rem", { lineHeight: "2rem" }],
        "2xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "3xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "4xl": ["3rem", { lineHeight: "1" }],
        "5xl": ["3.75rem", { lineHeight: "1" }],
        "6xl": ["4.5rem", { lineHeight: "1" }],
        "7xl": ["6rem", { lineHeight: "1" }],
        "8xl": ["8rem", { lineHeight: "1" }],
        "9xl": ["10rem", { lineHeight: "1" }],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: "currentColor",
            maxWidth: "none",
            "h1,h2,h3,h4,h5,h6": {
              color: theme("colors.neutral.200"),
              fontWeight: "bold",
            },
            a: {
              color: theme("colors.primary"),
              "&:hover": {
                color: theme("colors.primary-focus"),
              },
            },
            blockquote: {
              fontStyle: "normal",
              "& p:first-of-type::before, & p:last-of-type::after": {
                content: "none",
              },
            },
            img: {
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: theme("maxWidth.3xl"),
            },
          },
        },
      }),
    },
  },
};

module.exports = tailwindConfig;