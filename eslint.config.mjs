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
