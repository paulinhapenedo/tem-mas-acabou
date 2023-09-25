import { test as setup, expect } from '@playwright/test';

const TEST_EMAIL = process.env.USER_TEST_EMAIL || '';
const TEST_PWD = process.env.USER_TEST_PWD || '';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/unauthenticated');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('login@temmasacabou').fill(TEST_EMAIL);
  await page.getByPlaceholder('super!senh@').click();
  await page.getByPlaceholder('super!senh@').fill(TEST_PWD);
  await page.getByRole('button', { name: 'Entrar' }).click();

  await expect(page.getByRole('heading', { name: 'Bem vinda!' })).toBeVisible();

  await page.context().storageState({ path: authFile });
});
