import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  { 
    files: [
      '**/*.{js,mjs,cjs}'
    ], 
    plugins: { 
      js,
      '@stylistic': stylistic
    }, 
    extends: [
      'js/recommended'
    ],
    rules: {
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/no-multiple-empty-lines': ['error', { 'max': 1 }],
      '@stylistic/eol-last': ['error', 'always']
    }
  },
  { 
    files: [
      '**/*.{js,mjs,cjs}'
    ], 
    languageOptions: { 
      globals: globals.browser 
    } 
  },
])
