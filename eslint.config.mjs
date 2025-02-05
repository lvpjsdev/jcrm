import love from 'eslint-config-love';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginNode from 'eslint-plugin-node';

export default [
  {
    ignores: [
      'dist/**/*.ts',
      'dist/**',
      '**/*.mjs',
      'eslint.config.mjs',
      'postcss.config.cjs',
      '**/*.js',
      'node_modules',
    ],
  },
  love,
  eslintConfigPrettier,
  {
    ignores: [
      'node_modules',
      'dist/**/*.ts',
      'dist/**',
      '**/*.mjs',
      'eslint.config.mjs',
      '**/*.js',
    ],
    files: ['src/**/*.{ts,tsx}', 'backend/**/*.ts', 'webapp/**/*.{ts,tsx}'],
    plugins: {
      node: eslintPluginNode,
    },
    rules: {
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: false,
            orderImportKind: 'asc',
          },
        },
      ],

      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'eslint-comments/require-description': 'off',
      'react/react-in-jsx-scope': 'off',
      'node/no-process-env': ['error'],

      curly: ['error', 'all'],

      'no-irregular-whitespace': [
        'error',
        {
          skipTemplates: true,
          skipStrings: true,
        },
      ],
    },
  },
];
