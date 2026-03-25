/** @type {import("eslint").Linter.Config} */

const config = {
  root: true,
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['@sanity/eslint-config-studio', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint', 'unused-imports'],
  ignorePatterns: ['.sanity/*', 'node_modules/*'],
  rules: {
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
    'newline-before-return': 2,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],
    'no-console': [
      2,
      {
        allow: ['warn', 'error'],
      },
    ],
    'prettier/prettier': 'off',
    'import/prefer-default-export': 'off', // Named export is easier to refactor automatically
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': 0,
  },
}

module.exports = config
