module.exports = {
  root: true,
  extends: ['frontend-linter'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
