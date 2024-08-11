import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";
import importES6Autofix from "eslint-plugin-sort-imports-es6-autofix";
// import pluginReact from "eslint-plugin-react";


export default [
    {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
    {languageOptions: {globals: {...globals.browser, ...globals.node}}},
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    // pluginReact.configs.flat.recommended,
    {
        plugins: {
            "unused-imports": unusedImports,
            "sort-imports-es6-autofix": importES6Autofix
        },
        rules: {
            "for-direction": "error",
            "func-call-spacing": ["error", "never"],
            "import/extensions": "off",
            "import/no-cycle": "off",
            "import/no-extraneous-dependencies": "off",
            "import/prefer-default-export": "off",
            "indent": ["error", 4, {"SwitchCase": 1}],
            "linebreak-style": [0, "error", "windows"],
            "lines-between-class-members": "off",
            "max-len": [0, 120],
            "no-bitwise": "off",
            "no-console": "off",
            "no-mixed-operators": "off",
            "no-multi-assign": "off",
            "no-param-reassign": [2, {"props": false}],
            "no-plusplus": "off",
            "no-underscore-dangle": "off",
            "no-unused-vars": "off",
            "no-redeclare": "off",
            "object-curly-newline": ["error"],
            "prefer-destructuring": "off",
            "radix": ["error", "as-needed"],
            "space-before-function-paren": "off",
            "sort-imports-es6-autofix/sort-imports-es6": [2, {
                "ignoreCase": false,
                "ignoreMemberSort": false,
                "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
            }],
            "unused-imports/no-unused-imports": "error"
        }
    }
];