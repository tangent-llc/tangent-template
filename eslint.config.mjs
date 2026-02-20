import nextConfig from 'eslint-config-next/core-web-vitals';
import prettierConfig from 'eslint-config-prettier/flat';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

const eslintConfig = [
  {
    ignores: [
      '.next/',
      'out/',
      'dist/',
      'build/',
      'node_modules/',
      '*.tsbuildinfo',
      '.next/types/',
      'next.config.*',
      'postcss.config.*',
      '*.log',
      '.env*',
      '__coconut_cache__/',
      'scripts/*.py',
    ],
  },
  ...nextConfig,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
];

export default eslintConfig;
