module.exports = {
  ...require('@cryptocurrency-viewer/testing').backendJestConfig,
  displayName: 'unit-tests',
  roots: ['<rootDir>'],
  testMatch: ['<rootDir>/**/*.(spec|test).(ts|js)'],
};
