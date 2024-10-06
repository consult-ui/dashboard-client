import { signIn } from './helpers/sign-in';
import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Consult Ai | Платформа компании/);
});

test('no auth redirect to sign in', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByTestId('sign-in-form')).toBeVisible();
});

test('with auth redirect to home page', async ({ page }) => {
  await signIn(page);
  await expect(page.getByTestId('sidebar')).toBeVisible();
  await expect(page.getByTestId('dashboard-navbar')).toBeVisible();
  await expect(page.getByTestId('chat-widget')).toBeVisible();
});

test('sign out + redirect to sign in', async ({ page }) => {
  await signIn(page);
  const screenWidth = await page.evaluate(() => window.innerWidth);
  if (screenWidth <= 768) {
    const dropdownBtnM = page.getByTestId('profile-dropdown-btn-mobile');
    await expect(dropdownBtnM).toBeVisible();
    await dropdownBtnM.click();
  } else {
    const dropdownBtnD = page.getByTestId('profile-dropdown-btn-desktop');
    await expect(dropdownBtnD).toBeVisible();
    await dropdownBtnD.click();
  }
  const logoutBtn = page.getByTestId('sign-out-modal-btn');
  await expect(logoutBtn).toBeVisible();
  await logoutBtn.click();
  const confirmBtn = page.getByTestId('confirm-modal-btn');
  await expect(confirmBtn).toBeVisible();
  await confirmBtn.click();
  await expect(page.getByTestId('sign-in-form')).toBeVisible();
});
