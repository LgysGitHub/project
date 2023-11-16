module.exports = {
  extends: 'standard-with-typescript',
  parserOptions: {
    project: './tsconfig.json'
  },
  ignorePatterns: ['/build', '/user-portal-build'],
  rules: {
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-dynamic-delete': 'off'
  }
}
