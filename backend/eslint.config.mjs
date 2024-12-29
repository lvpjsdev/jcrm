import coreConfig from '../eslint.config.mjs';

export default [
  {
    files: ['src/**/*.ts'],
    extends: [coreConfig],
    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
];
