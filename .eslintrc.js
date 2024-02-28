module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    cypress: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'plugin:cypress/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'jest', 'cypress'],
  rules: {
    indent: ['error', 2], // Ajuste de indentación a 2 espacios
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'], // Cambiado a comillas simples
    semi: ['error', 'never'],
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-console': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 'off',
    // 'cypress/no-assigning-return-values': 'error',
    // 'cypress/no-unnecessary-waiting': 'error',
    // 'cypress/assertion-before-screenshot': 'warn',
    // 'cypress/no-force': 'warn',
    // 'cypress/no-async-tests': 'error',
    // 'cypress/no-pause': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
