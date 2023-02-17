const config = {
  cacheDirectory: '<rootDir>/.cache/jest/',
  coveragePathIgnorePatterns: [
    '.test.(js|mjs)',
    '.eslintrc.js',
    'config/*',
    'vendor/*',
  ],

  // Default test environment
  testEnvironment: './config/jest/environment/node.mjs',

  // Enable Babel transforms until Jest supports ESM
  // See: https://jestjs.io/docs/ecmascript-modules
  transform: {
    '^.+\\.m?js$': ['babel-jest', { rootMode: 'upward' }],
  },

  // Enable Babel transforms for ESM-only node_modules
  // See: https://jestjs.io/docs/ecmascript-modules
  transformIgnorePatterns: [
    `<rootDir>/node_modules/(?!${['del', 'slash'].join('|')}/)`,
  ],
}

export default {
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
      displayName: 'Nunjucks macro tests',
      setupFilesAfterEnv: ['./config/jest/matchers.js'],
      snapshotSerializers: [
        'jest-serializer-html'
      ],
      testEnvironment: './config/jest/environment/jsdom.mjs',
      testMatch: [
        '**/(*.)?template.test.{js,mjs}'
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
        '**/*.test.{js,mjs}',

        // Exclude macro/unit tests
        '!**/(*.)?template.test.{js,mjs}',
        '!**/*.unit.test.{js,mjs}',

        // Exclude other tests
        '!**/components/globals.test.mjs',
        '!**/components/*/**',
        '!**/gulp/**'
      ],

      // Web server required
      globalSetup: './config/jest/server/start.mjs',
      globalTeardown: './config/jest/server/stop.mjs'
    },
    {
      ...config,
      displayName: 'JavaScript component tests',
      testEnvironment: './config/jest/environment/puppeteer.mjs',
      testMatch: [
        '**/components/globals.test.mjs',
        '**/components/*/*.test.{js,mjs}',

        // Exclude macro/unit tests
        '!**/(*.)?template.test.{js,mjs}',
        '!**/*.unit.test.{js,mjs}'
      ],

      // Web server and browser required
      globalSetup: './config/jest/browser/open.mjs',
      globalTeardown: './config/jest/browser/close.mjs'
    }
  ],

  // Enable GitHub Actions reporter UI
  reporters: ['default', 'github-actions'],

  // Browser test increased timeout (5s to 15s)
  testTimeout: 15000
}
