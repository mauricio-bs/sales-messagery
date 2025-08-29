import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import pluginImport from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import importSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: {
      js,
      'simple-import-sort': importSort,
      prettier,
      import: pluginImport,
    },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
    rules: {
      'prettier/prettier': 'error',
      'prefer-const': 'off',
      'no-useless-return': 'off',
      'no-useless-escape': 'off',
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-useless-constructor': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-throw-literal': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'import/first': 'error',
      'import/newline-after-import': 'warn',
      'import/no-duplicates': 'error',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // Side effect imports.
            ['^\\u0000'],
            // Node.js builtins prefixed with `node:`.
            ['^node:'],
            // Packages.
            // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
            ['^@?\\w'],
            // Custom paths
            [
              '^@repository/',
              '^@modules/',
              '^@common/',
              '^@interceptor/',
              '^@root/',
              '^@decorator/',
              '^@config/',
              '^@entities/',
            ],
            // Absolute imports and other imports such as Vue-style `@/foo`.
            // Anything not matched in another group.
            ['^'],
            // Relative imports.
            // Anything that starts with a dot.
            ['^\\.'],
          ],
        },
      ],
      'simple-import-sort/exports': 'warn',
    },
  },
  tseslint.configs.recommended,
]);
