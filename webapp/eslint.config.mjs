import reactConfig from 'eslint-config-react-app';
import coreConfig from '../eslint.config.mjs';

export default [
  {
    files: ['**/*.{ts,tsx}'],
    extends: [coreConfig, reactConfig],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
  {
    files: ['./vite.config.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.node.json',
      },
    },
  },
];
