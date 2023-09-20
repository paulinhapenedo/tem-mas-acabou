import { getUserFromSession } from '../supabase-server';
import { userMock } from '~/__mocks__/user';

const mockedGetUser = jest
  .fn()
  .mockResolvedValue({ data: { user: null }, error: null });

jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createServerComponentClient: jest.fn().mockImplementation(() => ({
    auth: {
      getUser: mockedGetUser,
    },
  })),
}));

describe('supabase-server getUserFromSession', () => {
  test(`should return null if there's no user data`, async () => {
    const data = await getUserFromSession();

    expect(data).toBe(null);
  });

  test(`should return user information from the session if logged`, async () => {
    mockedGetUser.mockResolvedValue({
      data: { user: userMock },
      error: null,
    });

    const data = await getUserFromSession();

    expect(data).toMatchObject(userMock);
  });
});
