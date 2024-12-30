import coreConfig from '../eslint.config.mjs';
import foxkitReact from 'eslint-config-foxkit-react/configs/index.js';

export default [
  foxkitReact.react,
  foxkitReact.jsx,
  foxkitReact.preact,
  ...coreConfig,
  {
    files: ['src/**/*.{ts,tsx}'],
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
