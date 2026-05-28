const playwright = require('eslint-plugin-playwright');
const baseConfig = require('../../eslint.config.js');

module.exports = [
  ...baseConfig,
  {
    ...playwright.configs['flat/recommended'],
    files: ['e2e/**/*.ts', 'e2e/**/*.js'],
    rules: {},
  },
];
