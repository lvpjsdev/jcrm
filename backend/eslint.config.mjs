import coreConfig from '../eslint.config.mjs';

export default [
  ...coreConfig,
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
];
