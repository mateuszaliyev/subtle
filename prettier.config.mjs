import packageJson from "./package.json" assert { type: "json" };

/** @type {import("prettier").Config} */
const prettierConfig = {
  arrowParens: "always",
  bracketSameLine: false,
  bracketSpacing: true,
  importOrder: [
    "<BUILTIN_MODULES>",
    "^astro",
    "^@astrojs",
    "^solid-js",
    "<THIRD_PARTY_MODULES>",
    "^(@/components)(.*|$)",
    "^(@/layouts)(.*|$)",
    "^(@/utilities)(.*|$)",
    "^[.]",
  ].reduce((result, element, index) => {
    if (index) result.push("", element);
    else result.push(element);
    return result;
  }, /** @type {string[]} */ ([])),
  importOrderTypeScriptVersion: packageJson.devDependencies["@ianvs/prettier-plugin-sort-imports"],
  jsxSingleQuote: false,
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss",
  ],
  printWidth: 80,
  proseWrap: "always",
  quoteProps: "as-needed",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  tailwindAttributes: [
    "enter",
    "enterFrom",
    "enterTo",
    "leave",
    "leaveFrom",
    "leaveTo",
  ],
  tailwindFunctions: ["cva", "cx"],
  trailingComma: "all",
  useTabs: false,
};

export default prettierConfig;
