import love from 'eslint-config-love'
import eslintConfigPrettier from "eslint-config-prettier";



export default [{
    ignores: ["**/node_modules", "**/dist"],
}, eslintConfigPrettier, love, {
    rules: {
        "import/order": ["error", {
            alphabetize: {
                order: "asc",
                caseInsensitive: false,
                orderImportKind: "asc",
            },
        }],

        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/prefer-nullish-coalescing": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/triple-slash-reference": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/consistent-type-assertions": "off",
        "jsx-a11y/anchor-is-valid": "off",
        curly: ["error", "all"],

        "no-irregular-whitespace": ["error", {
            skipTemplates: true,
            skipStrings: true,
        }],
    },
}];