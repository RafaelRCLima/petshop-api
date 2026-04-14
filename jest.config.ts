import type { Config } from 'jest';

const config: Config = {
  bail: 1,
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['**/src/app**'],
  coverageReporters: ['text', 'lcov'],
  testMatch: ['**/tests/**/*.test.ts'],
  testEnvironment: 'node'
};

export default config;
