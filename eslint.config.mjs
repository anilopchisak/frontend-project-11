import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  {
    files: [
      '**/*.{js,mjs,cjs}',
    ],
    plugins: {
      js,
      '@stylistic': stylistic,
    },
    'extends': [
      'js/recommended',
    ],
    rules: {
      // Основные правила
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/no-multiple-empty-lines': ['error', { 'max': 1 }],
      '@stylistic/eol-last': ['error', 'always'],

      // Правила, добавленные ранее
      '@stylistic/no-trailing-spaces': ['error', {
        'ignoreComments': true,
        'skipBlankLines': false,
      }],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/quote-props': ['error', 'as-needed', {
        'keywords': true,
        'unnecessary': false,
      }],
      '@stylistic/indent': ['error', 2, {
        'SwitchCase': 1,
        'ignoredNodes': ['TemplateLiteral'],
        'offsetTernaryExpressions': true,
        'MemberExpression': 1,
        'FunctionExpression': {'body': 1, 'parameters': 2},
        'FunctionDeclaration': {'body': 1, 'parameters': 2},
        'CallExpression': {'arguments': 2},
      }],
      '@stylistic/arrow-parens': ['error', 'always'],
    },
  },
  {
    files: [
      '**/*.{js,mjs,cjs}',
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])
