import { test, expect } from '@playwright/test';

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test(`show unauthenticated page if user isn't logged in`, async ({ page }) => {
  await page.goto('/');

  const title = page.getByRole('heading', { name: 'Tem, mas acabou' });

  await expect(title).toBeVisible();
});

test(`should show signup form`, async ({ page }) => {
  await page.goto('/');

  const loginEmail = page.getByPlaceholder('Digite o seu email');
  const loginPwd = page.getByPlaceholder('Digite uma senha segura');

  await expect(loginEmail).toBeVisible();
  await expect(loginPwd).toBeVisible();
});

test(`unauthenticated page should have login button`, async ({ page }) => {
  await page.goto('/');

  const loginButton = page.getByRole('button', { name: 'Login' });

  await expect(loginButton).toBeVisible();
});

test(`show signup form when clicking on the Login button`, async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Login' }).click();
  const loginEmail = page.getByPlaceholder('login@temmasacabou');
  const loginPwd = page.getByPlaceholder('super!senh@');

  await expect(loginEmail).toBeVisible();
  await expect(loginPwd).toBeVisible();
});
