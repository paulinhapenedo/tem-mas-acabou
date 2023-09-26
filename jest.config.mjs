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
    '~/(.*)$': '<rootDir>/src/$1',
    '~/app/(.*)$': '<rootDir>/src/app/$1',
    '~/auth/(.*)$': '<rootDir>/src/app/auth/$1',
    '~/types/(.*)$': '<rootDir>/src/types/$1',
    '~/services/(.*)$': '<rootDir>/src/services/$1',
    '~/components/(.*)$': '<rootDir>/src/components/$1',
    '~/context/(.*)$': '<rootDir>/src/context/$1',
    '~/utils/(.*)$': '<rootDir>/src/utils/$1',
    '~/ui/(.*)$': '<rootDir>/src/ui/$1',
    '@supabase/auth-helpers-nextjs':
      '<rootDir>/src/__tests__/__mocks__/supabaseAuthHelpersMock.ts',
  },
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/jest-setup.js'],
  testPathIgnorePatterns: ['<rootDir>/src/e2e', '<rootDir>/src/__tests__'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
