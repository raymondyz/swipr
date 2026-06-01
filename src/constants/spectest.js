import { test, expect } from '@playwright/test';

test('can go to sign in link', async ({ page }) => {
    await page.goto('localhost://5173');
    await page.getByLabel('name').fill('big boy');
    await page.getByLabel('username').fill('big boy2');
    await page.getByLabel('email').fill('megachad@g.ucla.edu');
    await page.getByLabel('password').fill('hiddenpassword');
    await page.getByLabel('confirm-password').fill('hiddenpassword');
    await page.getByRole('button').click();
});

