module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  ignorePatterns: ['node_modules', 'types', '.github', 'build'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/strict',
    'plugin:jest-dom/recommended',
    'plugin:testing-library/react'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'react', 'simple-import-sort'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton']
      }
    ],
    'react/prop-types': 'off', // Because TypeScript already checks for this
    'valid-typeof': 'warn',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        // https://github.com/lydell/eslint-plugin-simple-import-sort/blob/main/examples/.eslintrc.js
        groups: [
          // `react` related packages come first.
          ['^react'],
          // Internal packages.
          ['^@macolmenerori?\\w'],
          // External packages.
          ['^@?\\w'],
          // Aliased commonly used directories.
          [
            '^(api|assets|common|components|locales|mocks|pages|src|services|state|styles|types|utils)(/.*|$)'
          ],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports, `.` and style imports last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$', '^.+\\.s?css$']
        ]
      }
    ],
    'no-console': 'warn',
    'no-useless-escape': 'warn'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
