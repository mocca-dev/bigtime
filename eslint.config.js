import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  {
    ignores: ["build/**", "dev-dist/**"],
  },
  js.configs.recommended,
  react.configs.flat.recommended,
  // Vite compiles JSX with the automatic runtime, so React needn't be in scope.
  react.configs.flat["jsx-runtime"],
  reactHooks.configs.flat["recommended-latest"],
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: "detect" },
    },
  },
  {
    files: ["**/*.test.{js,jsx}"],
    languageOptions: {
      // Vitest runs with `globals: true` (see vite.config.js).
      globals: globals.vitest,
    },
  },
];
