import { test, expect } from '@playwright/test';

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Sign-up flow', () => {
  test(`user should see private beta message if email isn't in the allowed list`, async ({
    page,
  }) => {
    await page.goto('/unauthenticated');

    await page.getByPlaceholder('Digite o seu email').click();
    await page.getByPlaceholder('Digite o seu email').fill('email@email.com');
    await page.getByPlaceholder('Digite uma senha segura').click();
    await page.getByPlaceholder('Digite uma senha segura').fill('s3cur3pwd');
    await page.getByRole('button', { name: 'Cadastrar' }).click();

    const feedbackTitle = await page
      .getByRole('alert')
      .getByRole('paragraph')
      .first()
      .innerText();
    const feedbackDescription = await page
      .getByRole('alert')
      .getByRole('paragraph')
      .last()
      .innerText();

    expect(feedbackTitle).toBe('Desculpe o inconveniente! 🙈');
    expect(feedbackDescription).toBe(
      'Esse é um app para estudo, então o registro está limitado.',
    );
  });
});
