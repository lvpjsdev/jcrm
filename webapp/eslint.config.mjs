import coreConfig from '../eslint.config.mjs';

export default [
  ...coreConfig,
  {files: ['src/**/*.{ts,tsx}'],
  languageOptions: {
    parserOptions: {
      project: './tsconfig.json',
    },
},},
  {
    files: ['./vite.config.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.node.json',
      },
    },
  },
];
