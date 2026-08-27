// eslint.config.js
import eslintPluginImport from 'eslint-plugin-import';

export default [
  {
    ignores: ['node_modules/**'],
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      import: eslintPluginImport,
    },
    rules: {
      // Add your rules here
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
    },
  },
];
