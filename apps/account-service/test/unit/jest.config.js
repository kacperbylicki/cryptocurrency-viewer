module.exports = {
  ...require('@cryptocurrency-viewer/testing').backendConfig,
  displayName: 'unit-tests',
  roots: ['<rootDir>'],
  testMatch: ['<rootDir>/**/*.(spec|test).(ts|js)'],
};
