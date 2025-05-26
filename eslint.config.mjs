import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  stylistic.configs.recommended,
  js.configs.recommended,
  {
    files: [
      '**/*.{js,mjs,cjs}',
    ],
    ignores: [
      'dist/',
    ],
    plugins: {
      js,
      stylistic,
    },
    extends: [
      'js/recommended',
      'stylistic/recommended',
    ],
  },
  {
    files: [
      '**/*.{js,mjs,cjs}',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        projectService: true,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
])
