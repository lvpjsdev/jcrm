import coreConfig from '../eslint.config.mjs';
import antfu from '@antfu/eslint-config';

const reactAntfuConfig = antfu({
  react: true,
});

export default [
  reactAntfuConfig,
  coreConfig,
  {
    files: ['./**/*.{ts,tsx}'],
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
