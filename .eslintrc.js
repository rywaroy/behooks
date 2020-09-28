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
    rules: {
        'consistent-return': 0,
        'import/prefer-default-export': 0,
        'import/extensions': 0,
        'import/no-unresolved': 0,
        'no-underscore-dangle': 0,
        'max-len': 0,
        'no-use-before-define': 0,
        'no-unused-vars': 1,
    },
    parser: '@typescript-eslint/parser',
};
