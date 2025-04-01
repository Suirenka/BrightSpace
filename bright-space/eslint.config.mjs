import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  // Override rule to disable react/react-in-jsx-scope
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": [
        "warn",
        {
          "vars": "all",
          "args": "after-used"
        }
      ]
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
