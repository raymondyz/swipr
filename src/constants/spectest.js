import { test, expect } from '@playwright/test';

test('can go to sign in link', async ({ page }) => {
    await page.goto('/RegistrationPanel');
    await page.getByLabel('name').fill('big boy');
    await page.getByLabel('username').fill('big boy2');
    await page.getByLabel('email').fill('megachad@g.ucla.edu');
    await page.getByLabel('password').fill('hiddenpassword');
    await page.getByLabel('confirm-password').fill('hiddenpassword');
    await page.getByRole('button', {name: /bigAhhButton|submit/i}).click();
    await expect(page).toHaveURL(/.*HomePage/);
});

test('mismatched passwords', async ({ page }) => {
    await page.goto('/RegistrationPanel');
    await page.getByLabel('name').fill('big boy');
    await page.getByLabel('username').fill('big boy2');
    await page.getByLabel('email').fill('megachad@g.ucla.edu');
    await page.getByLabel('password').fill('hiddenpassword');
    await page.getByLabel('confirm-password').fill('hiddesdgsdsnpassword');
    await page.getByRole('button', { name: /bigAhhButton|submit/i}).click();
    // const errorelement = page.locator('error');
    //await expect(errorelement).toBeVisible();
    //await expect(errorelement).toHaveText('Passwords don\'t match!');
    await expect(page.getByText("Passwords don\'t match!")).toBeVisible();
});
