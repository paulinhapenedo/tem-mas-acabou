import '@testing-library/jest-dom';
import { loadEnvConfig } from '@next/env';

import { supabase } from '~/__tests__/__mocks__/supabaseAuthHelpersMock';

loadEnvConfig(process.cwd());

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

/* @type jest.SpyInstance */
let onAuthStateChangeStub;

beforeEach(() => {
  onAuthStateChangeStub = jest
    .spyOn(supabase.auth, 'onAuthStateChange')
    .mockImplementation(() => {
      return { data: { subscription: { unsubscribe: jest.fn() } } };
    });
});

afterEach(() => {
  onAuthStateChangeStub.mockRestore();
});
