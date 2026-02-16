import nextConfig from 'eslint-config-next/core-web-vitals';
import prettierConfig from 'eslint-config-prettier/flat';

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
  prettierConfig,
  {
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];

export default eslintConfig;
