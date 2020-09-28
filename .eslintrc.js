module.exports = {
    env: { browser: true, es6: true, node: true, commonjs: true },
    extends: ['plugin:react/recommended', 'airbnb-base'],
    globals: { Atomics: 'readonly', SharedArrayBuffer: 'readonly' },
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {},
    parser: '@typescript-eslint/parser',
};
