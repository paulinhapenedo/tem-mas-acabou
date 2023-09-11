import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import Home from '../page';

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
  it('renders sign in', async () => {
    render(<Home />);

    const content = screen.getByText('Sign In');

    expect(content).toBeInTheDocument();
  });

  it('calls supabase auth signout method', async () => {
    render(<Home />);

    const signInButton = screen.getByRole('button', { name: 'Sign Out' });

    // user.click(signInButton);
    fireEvent.click(signInButton);

    await act(() =>
      waitFor(() => {
        console.log('mockedSignOut', typeof mockedSignOut);
        return expect(mockedSignOut).toHaveBeenCalled();
      }),
    );
  });
});
