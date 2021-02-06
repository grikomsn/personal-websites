module.exports = {
  extends: [
    "plugin:prettier/recommended",
    "prettier/react",
    "kentcdodds",
    "kentcdodds/react",
    "kentcdodds/jsx-a11y",
  ],

  plugins: ["prettier", "simple-import-sort"],

  rules: {
    // import rules
    "import/extensions": [
      "warn",
      "never",
      {
        css: "ignorePackages",
        graphql: "ignorePackages",
      },
    ],
    "import/newline-after-import": "warn",
    "import/order": "off",
    "sort-imports": "off",

    // simple import rules
    "simple-import-sort/exports": "warn",
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [
          ["^.+\\.s?css$"],
          ["^\\u0000"],
          ["^react$"],
          ["^@/"],
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
        ],
      },
    ],

    // react rules
    "react/jsx-sort-props": [
      "warn",
      {
        reservedFirst: ["key"],
      },
    ],

    // various rules
    "max-lines-per-function": "off",
    "no-void": "off",
    "require-await": "off",
  },

  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
      rules: {
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-unnecessary-condition": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
      },
    },
  ],
};
