/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  extends: [
    "plugin:astro/recommended",
    "plugin:astro/jsx-a11y-recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
  ],
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        disallowTypeAnnotations: false,
        fixStyle: "inline-type-imports",
        prefer: "type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
  },
};

module.exports = eslintConfig;
