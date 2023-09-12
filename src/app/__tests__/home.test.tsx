const mockedSignOut = jest.fn().mockResolvedValue({});
jest.mock('@supabase/auth-helpers-nextjs', () => {
  return {
    createClientComponentClient: () => {
      return {
        auth: () => {
          return {
            signOut: () => mockedSignOut,
          };
        },
      };
    },
  };
});

const mockedRefresh = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    refresh: mockedRefresh,
  })),
}));

describe.skip('Home', () => {
  it.todo('renders sign in');
  it.todo('calls supabase auth signout method');
});
