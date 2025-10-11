// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
    expoConfig,
    {
        ignores: ["dist/*"],
        rules: {
            quotes: ["error", "double"],
            semi: ["error", "always"],
            camelcase: "error",
            indent: ["error", 4],
            "no-duplicate-imports": "error",
        },
    },
  
]);
