module.exports = {
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  env: {
    jest: true,
    browser: true,
    es6: true,
  },
  settings: {
    react: {
      version: '16.0',
    },
  },
  plugins: ['react', 'prettier', 'promise', 'jsx-a11y'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    it: 'readonly',
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  rules: {
    'promise/always-return': 'warn',
    semi: ['error', 'never'],
    'no-extra-semi': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'eol-last': ['error', 'always'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'],
    indent: [
      'error',
      2,
      {
        ignoreComments: true,
        ignoredNodes: ['TemplateLiteral'],
        SwitchCase: 1,
      },
    ],
    'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 0, maxEOF: 1 }],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx'] }],
    'react/prop-types': 2,
    'no-console': 'off',
    'jsx-a11y/alt-text': 'error',
    'object-shorthand': ['error', 'always'],
    'jsx-quotes': ['error', 'prefer-single'],
    quotes: ['error', 'single'],
    'quote-props': ['error', 'as-needed'],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'space-infix-ops': 'error',
    'comma-spacing': ['error', { before: false, after: true }],
    'no-unused-vars': [
      'warn',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
    ],
    'arrow-spacing': ['error', { before: true, after: true }],
    'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],
  },
}
