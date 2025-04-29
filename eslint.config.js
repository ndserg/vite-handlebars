import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  {
    plugins: {
      prettier: prettierPlugin,
    },
  },
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2021,
      },
    },
  },
  { ignores: ['node_modules', 'dist'] },
  {
    files: ['src/js/**/*.{js}'],
  },
  {
    rules: {
      ...eslintConfigPrettier.rules,
      'no-console': 'warn',
      'no-unused-vars': 'error',
      'prefer-const': 'warn',
      'no-var': 'error',
      'prettier/prettier': 'error',
    },
  },
]);
