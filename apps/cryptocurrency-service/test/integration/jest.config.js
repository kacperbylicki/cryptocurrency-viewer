module.exports = {
  ...require('@cryptocurrency-viewer/testing').backendJestConfig,
  displayName: 'integration-tests',
  roots: ['<rootDir>'],
  testMatch: ['<rootDir>/**/*.(spec|test).(ts|js)'],
};
