import { test, expect } from '@playwright/test';

test('can log in', async ({ page }) => {
    await page.goto('/');
    await page.locator('#email').fill('test@test.com');
    await page.locator('#password').fill('testaccount1');
    await page.getByRole('button', {name: 'Login',exact:true}).click({force: true});
    await expect(page.getByRole('button',{name: 'Search',exact:true})).toBeVisible();
});
