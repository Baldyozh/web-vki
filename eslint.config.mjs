import stylistic from "@stylistic/eslint-plugin";
import js from "@eslint/js";
// import next from "eslint-plugin-next";
import globals from "globals";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";

export default [
  {
    ignores: ["**/node_modules/*", "**/.next/*", "**/.cache/*"], // Add common ignore patterns
  },
  {
    files: [],
    plugins: {
      "@stylistic": stylistic,
      // next: next, // Use the 'next' plugin
      "@typescript-eslint": typescriptEslintPlugin,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es6,
        React: "readonly", // Important for React projects
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      parser: typescriptEslintParser, //  Specify the TypeScript parser for all JS/TS files
    },
    settings: {
      // next: {
      //   rootDir: ["."], // Point to your Next.js root
      // },
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
    rules: {
      ...js.configs.recommended.rules, // Use recommended ruleset


      // ...next.configs.recommended.rules, // Add next.js recommended rules
      // ...next.configs.coreWebVitals.rules,  // Add next.js core web vitals rules,
      ...typescriptEslintPlugin.configs["recommended-type-checked"].rules,  // Enable recommended typescript rules
      ...stylistic.configs.recommended.rules,

      // Stylistic rules (configure these to your preference)
      "@stylistic/semi": ["error", "always"],
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": ["error", "single", { avoidEscape: true }],
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/array-bracket-spacing": ["error", "never"],
      // "@stylistic/space-before-function-paren": ["error", {
      //   "anonymous": "always",
      //   "named": "always",
      //   // "asyncArrow": "never",
      //   "catch": "always"
      // }],  // consistent with airbnb style guide

      // React specific rules
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",  // Next.js doesn't require importing React
      "react/prop-types": "off", // TS handles prop types

      // Next.js specific rules - configure as needed.
      "next/link-passhref": "off", // You might not want this rule

      // Possible Errors
      "no-console": "off", //  or "error" depending on your preference


      // Best Practices
      eqeqeq: "error", // Enforce strict equality === and !==
      "no-unused-vars": "warn", // Or "error"
      "no-shadow": "off", // Typescript handles shadowing better.
      "@typescript-eslint/no-shadow": "error", //  Enable shadowing rules.
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/triple-slash-reference": "off",

      // TypeScript specific rules
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-unused-vars": "warn", // Or "error"

      // Override JS rules where needed for TS
      "no-undef": "off", //  typescript handles this

      "@stylistic/member-delimiter-style": [
        "warn",
        {
          "multiline": {
            "delimiter": "semi",
            "requireLast": true
          },
          "singleline": {
            "delimiter": "semi",
            "requireLast": false
          },
          "multilineDetection": "brackets"
        }

      ],
    },
  },
  {
    // Typescript specific config for type-aware linting.
    files: ["**/*.ts?(x)"],
    languageOptions: {
      parserOptions: {
        project: true, // Enable type-aware linting for TypeScript projects.  Requires `tsconfig.json`.
      },
    },
  },
];
