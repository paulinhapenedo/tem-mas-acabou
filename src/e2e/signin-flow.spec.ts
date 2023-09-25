import { test, expect } from '@playwright/test';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const TEST_EMAIL = process.env.USER_TEST_EMAIL || '';
const TEST_PWD = process.env.USER_TEST_PWD || '';
const AUTH_URL = `${SUPABASE_URL}/auth/v1`;

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Sign-in flow', () => {
  test(`show toast with error if something goes wrong`, async ({ page }) => {
    await page.route(`${AUTH_URL}/token?grant_type=password`, async (route) => {
      await route.fulfill({ status: 400 });
    });

    await page.goto('/unauthenticated');

    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByPlaceholder('login@temmasacabou').fill('email@email.com');
    await page.getByPlaceholder('super!senh@').click();
    await page.getByPlaceholder('super!senh@').fill('1234567');
    await page.getByRole('button', { name: 'Entrar' }).click();

    const toastLocator = page.locator('li[role="status"]');

    await expect(toastLocator).toBeVisible();
  });

  test(`redirect user to '/' if login is successful`, async ({ page }) => {
    await page.goto('/unauthenticated');

    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByPlaceholder('login@temmasacabou').fill(TEST_EMAIL);
    await page.getByPlaceholder('super!senh@').click();
    await page.getByPlaceholder('super!senh@').fill(TEST_PWD);
    await page.getByRole('button', { name: 'Entrar' }).click();

    await expect(
      page.getByRole('heading', { name: 'Bem vinda!' }),
    ).toBeVisible();
  });
});
