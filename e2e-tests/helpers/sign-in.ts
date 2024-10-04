import { expect, Page } from '@playwright/test';

const loginValue = 'cergocergo41@gmail.com';
const passwordValue = 'cjdsv2233';

export async function signIn(page: Page) {
  await page.goto('/sign-in');
  const login = page.getByTestId('sign-in-login');
  const password = page.getByTestId('sign-in-password');
  const submit = page.getByTestId('sign-in-submit');
  await expect(login).toBeVisible();
  await expect(password).toBeVisible();
  await expect(submit).toBeVisible();
  await login.fill(loginValue);
  await password.fill(passwordValue);
  await submit.click();
}
