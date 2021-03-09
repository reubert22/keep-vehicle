module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'airbnb-typescript',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'react-hooks', '@typescript-eslint'],
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'import/no-unresolved': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-cycle': 'error',
    'import/order': 'error',
    'global-require': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: true, variables: false, classes: true },
    ],
    'prettier/prettier': 'error',
    'no-console': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/return-await': 'off',
  },
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
      },
    },
    {
      files: ['App.tsx'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
