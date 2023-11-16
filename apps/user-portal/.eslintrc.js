module.exports = {
  plugins: [
    'react-hooks'
  ],
  extends: 'standard-with-typescript',
  parserOptions: {
    project: './tsconfig.json'
  },
  ignorePatterns: ['*.d.ts', '/public/external', '/build'],
  rules: {
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    // TODO: enable 'react-hooks/exhaustive-deps' and correct all warning codes
    // 'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies

    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off'
  }
}
