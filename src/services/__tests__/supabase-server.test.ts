/** @jest-environment node */

import { UserResponse } from '@supabase/supabase-js';

import { supabase } from '~/__tests__/__mocks__/supabaseSsrMock';
import { userMock } from '~/__tests__/__mocks__/user';
import { getUserFromSession } from '../supabase-server';

describe('supabase-server', () => {
  describe('getUserFromSession', () => {
    test(`should return null if there's no user data`, async () => {
      jest
        .spyOn(supabase.auth, 'getUser')
        .mockResolvedValue({ data: { user: null } } as UserResponse);
      const user = await getUserFromSession();

      expect(user).toBe(null);
    });

    test(`should return null if there's an error`, async () => {
      jest.spyOn(supabase.auth, 'getUser').mockRejectedValue('User not found');

      const spyConsole = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const user = await getUserFromSession();

      expect(user).toBe(null);
      expect(spyConsole).toHaveBeenCalledWith(
        'Error getting user from active session:',
        'User not found',
      );
    });

    test(`should return user information from the session if logged`, async () => {
      jest
        .spyOn(supabase.auth, 'getUser')
        .mockResolvedValue({ data: { user: userMock } } as UserResponse);

      const userResponse = await getUserFromSession();

      expect(userResponse).toMatchObject(userMock);
    });
  });
});
