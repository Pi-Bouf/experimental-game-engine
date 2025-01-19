import pluginJs from "@eslint/js";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";


export default [
    { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        plugins: {
            "unused-imports": unusedImports,
            "simple-import-sort": eslintPluginSimpleImportSort,
        },
        ignores: ["**/dist/*"],
        rules: {
            "for-direction": "error",
            "func-call-spacing": ["error", "never"],
            "import/extensions": "off",
            "import/no-cycle": "off",
            "import/no-extraneous-dependencies": "off",
            "import/prefer-default-export": "off",
            "indent": ["error", 4, { "SwitchCase": 1 }],
            "linebreak-style": [0, "error", "windows"],
            "lines-between-class-members": "off",
            "max-len": [0, 120],
            "no-bitwise": "off",
            "no-console": "off",
            "no-mixed-operators": "off",
            "no-multi-assign": "off",
            "no-param-reassign": [2, { "props": false }],
            "no-plusplus": "off",
            "no-underscore-dangle": "off",
            "no-unused-vars": "off",
            "no-redeclare": "off",
            "object-curly-newline": ["error"],
            "object-curly-spacing": ["error", "always"],
            "prefer-destructuring": "off",
            "radix": ["error", "as-needed"],
            "space-before-function-paren": "off",
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
            "semi": "error",
            "unused-imports/no-unused-imports": "error"
        }
    }
];