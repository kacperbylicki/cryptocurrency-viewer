module.exports = {
  ...require('@cryptocurrency-viewer/testing').backendConfig,
  displayName: 'integration-tests',
  roots: ['<rootDir>'],
  testMatch: ['<rootDir>/**/*.(spec|test).(ts|js)'],
};
