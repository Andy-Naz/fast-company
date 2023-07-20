module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["plugin:react/recommended", "standard"],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        indent: ["off"],
        quotes: ["error", "double", { allowTemplateLiterals: true, avoidEscape: true }],
        "space-before-function-paren": ["error", { anonymous: "always", named: "never" }],
        // indent: ["error", 4, { SwitchCase: 1 }],
        "multiline-ternary": ["off"]
    }
}
