import { test, expect } from '@playwright/test';

test('can go to sign in link', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Create Account').click();
    await page.locator('#name').fill('big boy');
    await page.locator('#username').fill('big boy2');
    await page.locator('#email').fill('megachad@g.ucla.edu');
    await page.locator('#password').fill('hiddenpassword');
    await page.locator('#confirm-password').fill('hiddenpassword');
    await page.getByRole('button', {name: 'Signup',exact:true}).click({force: true});
    //await expect(page).toHaveURL(/.*HomePage/);
});
