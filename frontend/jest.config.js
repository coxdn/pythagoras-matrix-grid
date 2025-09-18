// const { Response, Request, Headers, fetch } = require('whatwg-fetch');
// window.fetch = fetch;
// window.Request = Request;
// window.Headers = Headers;
// window.Response = Response;

module.exports = {
  collectCoverageFrom: ["src/**/*.{js,jsx,mjs}"],
  testMatch: ["<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}", "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}"],
  transform: {
    "^.+\\.(js|jsx|mjs)$": "./jest-transform.js"
  },
  transformIgnorePatterns: ["[/\\\\](node_modules|modified_modules)[/\\\\].+\\.(js|jsx|mjs)$"],
  globals: { __DEV__: true },
  automock: false,
  setupFiles: ['./jest.setup.js']
};