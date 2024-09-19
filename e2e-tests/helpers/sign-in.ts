import { expect, Page } from '@playwright/test';

export async function signIn(page: Page) {
  await page.goto('/sign-in');
  const login = page.getByTestId('sign-in-login');
  const password = page.getByTestId('sign-in-password');
  const submit = page.getByTestId('sign-in-submit');
  await expect(login).toBeVisible();
  await expect(password).toBeVisible();
  await expect(submit).toBeVisible();
  await login.fill('cergocergo41@gmail.com');
  await password.fill('cjdsv2233');
  await submit.click();
}
