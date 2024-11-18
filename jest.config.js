module.exports = {
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  collectCoverage: false,
  globalSetup: '<rootDir>/jest-global-setup.js',
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // <https://jestjs.io/docs/webpack#mocking-css-modules>
    '^.+\\\\.module\\\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '\\.(css|scss)$': '<rootDir>/src/mocks/fileMock.js',

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': `<rootDir>/src/mocks/fileMock.js`
  },
  moduleDirectories: ['node_modules', 'src', '<rootDir>/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.github/',
    '<rootDir>/build/',
    '<rootDir>/public/'
  ],
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // <https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object>
    '^.+\\\\.(js|jsx|ts|tsx)$': ['ts-jest']
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\\\.module\\\\.(css|sass|scss)$'],
  testEnvironment: 'jest-environment-jsdom',
  testTimeout: 15000,
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/jest.polyfills.js'],
  testEnvironmentOptions: {
    customExportConditions: ['']
  }
};
