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
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@ideanick/backend/**', '!@ideanick/backend/**/input'],
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: '[object.type=MetaProperty][property.name=env]',
          message: 'Use import { env } from "app/env" instead',
        },
      ],
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
