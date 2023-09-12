import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '~/(.*)$': '<rootDir>/src/app/$1',
    '~/utils/(.*)$': '<rootDir>/src/app/utils/$1',
    '~/types/(.*)$': '<rootDir>/src/app/types/$1',
    '~/auth/(.*)$': '<rootDir>/src/app/auth/$1',
    '~/components/(.*)$': '<rootDir>/src/app/components/$1',
    '~/ui/(.*)$': '<rootDir>/src/app/ui/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
