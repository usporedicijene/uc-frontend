import typescriptEslint from "@typescript-eslint/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import sortDestructureKeys from "eslint-plugin-sort-destructure-keys";
import unusedImports from "eslint-plugin-unused-imports";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "unused-imports": unusedImports,
      "simple-import-sort": simpleImportSort,
      "sort-destructure-keys": sortDestructureKeys,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-empty-interface": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "no-console": "error",
      "no-debugger": "error",
      "react/jsx-sort-props": [
        "error",
        {
          callbacksLast: true,
        },
      ],
      "react/react-in-jsx-scope": "off",
      "unused-imports/no-unused-imports": "error",
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^use client"],
            ["^react", "^@?\\w"],
            ["^@/(?!.*\\.svg$).*"],
            ["^[./]"],
          ],
        },
      ],
      "sort-destructure-keys/sort-destructure-keys": "error",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
