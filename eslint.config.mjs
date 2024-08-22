module.exports = {
  parser: "@typescript-eslint/parser", // Specify the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the use of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "plugin:react/recommended", // Uses the recommended rules from eslint-plugin-react
    "plugin:react-hooks/recommended", // Uses the recommended rules for React hooks
    "prettier", // Make sure this is always the last configuration in the extends array
  ],
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  rules: {
    // Place to specify additional ESLint rules.
    // You can override the rules specified in the extended configs here.
  },
  settings: {
    react: {
      version: "detect", // Automatically detects the version of React
    },
  },
};
