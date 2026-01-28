/** @type {import("prettier").Config} */
const prettierConfig = {
  bracketSpacing: true,
  endOfLine: "auto",
  plugins: ["prettier-plugin-tailwindcss"],
  printWidth: 80,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  tailwindFunctions: ["cva", "cn"],
  trailingComma: "all",
};

export default prettierConfig;
