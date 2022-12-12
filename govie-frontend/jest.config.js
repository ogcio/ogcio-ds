const config = {
  cacheDirectory: '<rootDir>/.cache/jest/',
  coveragePathIgnorePatterns: [
    '.test.(js|mjs)',
    '.eslintrc.js',
    'config/*',
    'vendor/*'
  ],
  testEnvironment: './config/jest/environment/node.mjs',
  transform: {
    '^.+\\.m?js$': ['babel-jest', { rootMode: 'upward' }]
  }
}

module.exports = {
  collectCoverageFrom: ['./src/**/*.{js,mjs}'],
  projects: [
    {
      ...config,
      displayName: 'Gulp tasks',
      testMatch: [
        '**/gulp/**/*.test.{js,mjs}'
      ]
    },
    {
      ...config,
      displayName: 'JavaScript unit tests',
      testEnvironment: './config/jest/environment/jsdom.mjs',
      testMatch: [
        '**/*.unit.test.{js,mjs}'
      ]
    },
    {
      ...config,
      displayName: 'JavaScript behaviour tests',
      testMatch: [
        '**/*.test.js',

        // Exclude macro/unit tests
        '!**/(*.)?template.test.{js,mjs}',
        '!**/*.unit.test.{js,mjs}',

        // Exclude other tests
        '!**/all.test.{js,mjs}',
        '!**/components/*/**',
        '!**/gulp/**'
      ]
    }
  ],
  reporters: ['default', 'github-actions']
}
