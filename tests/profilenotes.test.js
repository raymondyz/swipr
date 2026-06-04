import { test, expect } from '@playwright/test';

test('can log in', async ({ page }) => {
    await page.goto('/');
    await page.locator('#email').fill('test@test.com');
    await page.locator('#password').fill('testaccount1');
    await page.getByRole('button', {name: 'Login',exact:true}).click({force: true});
    await page.getByRole('button', {name: 'Profile',exact:true}).click({force: true});
    const str1 = 'oh my god im blooming'
    const str2 = 'holy toledo'
    let boolstr1 = true
    const curnotes=  await page.locator('#notes').inputValue();
    if (curnotes === str1) {
    await page.locator('#notes').fill(str2);
    } else {await page.locator('#notes').fill(str1);
        boolstr1=false
    }
    await page.getByRole('button', {name: 'Save',exact:true}).click({force: true});
    await page.getByRole('button', {name: 'Search',exact:true}).click({force: true});
    await page.getByRole('button', {name: 'test'}).click({force: true});
    if (!boolstr1) {
    await expect(page.getByText(str1)).toBeVisible();}
    else {
        await expect(page.getByText(str2)).toBeVisible();
    }
});
