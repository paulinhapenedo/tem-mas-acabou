import userEvent from '@testing-library/user-event';

import { supabase } from '~/__tests__/__mocks__/supabaseSsrMock';
import { userProfileMock } from '~/__tests__/__mocks__/user';
import { render, screen, waitFor } from '~/__tests__/test-utils';
import { UserMenu } from '../UserMenu';

const mockedRefresh = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockImplementation(() => {
    return {
      refresh: mockedRefresh,
    };
  }),
}));

describe('UserMenu', () => {
  test(`show emoji fallback in case user doesn't have avatar`, async () => {
    render(<UserMenu user={userProfileMock} />);

    expect(
      screen.getByRole('button', { name: 'Abrir o menu do usuário' }),
    ).toHaveTextContent('🐯');
  });

  test(`show dropdown menu with 3 menu items when user interacts with the avatar`, async () => {
    const user = userEvent.setup();

    render(<UserMenu user={userProfileMock} />);

    await user.click(
      screen.getByRole('button', { name: 'Abrir o menu do usuário' }),
    );

    const dropdown = screen.getByRole('menu');
    const menuItems = screen.getAllByRole('menuitem');

    expect(dropdown).toBeVisible();
    expect(menuItems.length).toBe(3);
  });

  test(`dropdown menu has menu item "Editar perfil"`, async () => {
    const user = userEvent.setup();

    render(<UserMenu user={userProfileMock} />);

    await user.click(
      screen.getByRole('button', { name: 'Abrir o menu do usuário' }),
    );

    const menuItem = screen.getAllByRole('menuitem')[0];

    expect(menuItem.getAttribute('href')).toBe('/profile');
    expect(menuItem.textContent).toBe('Editar perfil');
  });

  test(`dropdown menu has menu item "Minhas listas"`, async () => {
    const user = userEvent.setup();

    render(<UserMenu user={userProfileMock} />);

    await user.click(
      screen.getByRole('button', { name: 'Abrir o menu do usuário' }),
    );

    const menuItem = screen.getAllByRole('menuitem')[1];

    expect(menuItem.getAttribute('href')).toBe('/lists');
    expect(menuItem.textContent).toBe('Minhas listas');
  });

  test(`dropdown menu has menu item "Encerrar sessão"`, async () => {
    const spySignOut = jest.spyOn(supabase.auth, 'signOut');

    const user = userEvent.setup();

    render(<UserMenu user={userProfileMock} />);

    await user.click(
      screen.getByRole('button', { name: 'Abrir o menu do usuário' }),
    );

    const menuItem = screen.getAllByRole('menuitem')[2];

    expect(menuItem.textContent).toBe('Encerrar sessão');

    user.click(menuItem);
    await waitFor(() => {
      expect(spySignOut).toHaveBeenCalledTimes(1);
      expect(mockedRefresh).toHaveBeenCalledTimes(1);
    });
  });
});
