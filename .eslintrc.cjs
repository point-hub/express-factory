module.exports = {
  root: true,
  plugins: ["prettier"],
  extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": ["error", { printWidth: 120 }],
  },
};
